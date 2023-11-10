import { APIGatewayProxyEvent, APIGatewayProxyHandler, SNSEvent } from "aws-lambda";

import { instance, loadDatabase } from "../../shared/database/sequelize";
import {
  init, TournamentParticipation,
  TournamentPriceRatio,
  TournamentPriceDistribution,
  TournamentExamParticipationQuestion,
  Tournament,
  Student,
} from "../../shared/database/models";
import { Op } from 'sequelize'

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent & SNSEvent) => {
  if (!instance.connection) {
    console.log("No connection exists");
    instance.connection = await loadDatabase();
  } else {
    console.log("Connection exists");
    // restart connection pool to ensure connections are not re-used across invocations
    instance.connection.connectionManager.initPools();

    // restore `getConnection()` if it has been overwritten by `close()`
    if (
      Object.prototype.hasOwnProperty.call(
        instance.connection.connectionManager,
        "getConnection"
      )
    ) {
      delete instance.connection.connectionManager.getConnection;
    }
  }

  init(instance.connection);

  const payload = JSON.parse(_event.Records[0].Sns.Message);
  const leaderBoardCount = await TournamentParticipation.findAll({
    where: {
      tournamentScheduleUUID: payload.participationUUID
    },
    include: [{
      model: Tournament,
      as: "tournament",
    },
    {
      model: Student,
      as: 'students',
      attributes: ['uuid', 'firstName', 'lastName']
    }
    ],
    order: [['marks', 'DESC'], ['updatedAt', 'ASC'], ['answeredMilliSeconds', 'ASC']]
  })
  const response = []
  if (leaderBoardCount.length) {
    const priceRatio =
      await TournamentPriceRatio.findAll({
        where: {
          tournamentUUID: leaderBoardCount[0].tournamentUUID,
          amount: { [Op.ne]: 0 }
        },
        order: [['toValue', 'ASC']]
      })
    const length = priceRatio.length
    let i = 0
    for (const obj of leaderBoardCount) {
      obj.coins = obj.coins / 100
      const uuid = obj.uuid
      const marks = obj.marks
      const studentUUID = obj.studentUUID
      const studentName = obj.students[0].firstName + ' ' + obj.students[0].lastName
      const tournamentScheduleUUID = obj.tournamentScheduleUUID
      const prizeAmount = priceRatio[i]?.amount
      if (i < length && priceRatio[i].fromValue === 0) {
        response.push({
          uuid,
          marks,
          studentUUID,
          studentName,
          tournamentScheduleUUID,
          prizeAmount,
          rank: i + 1,
          coins: obj.coins
        })
        i++
      }
      if (i < length && priceRatio.length && priceRatio[i].fromValue > 0) {
        response.push({
          uuid,
          marks,
          studentUUID,
          studentName,
          tournamentScheduleUUID,
          prizeAmount,
          rank: i + 1,
          coins: obj.coins
        })
        i++
      } else {
        const temp = response.find(
          (each) => each.studentUUID === obj.students[0].uuid
        )
        if (!temp) {
          response.push({
            uuid,
            marks,
            studentUUID,
            studentName,
            tournamentScheduleUUID,
            prizeAmount: 0,
            rank: i + 1,
            coins: obj.coins
          })
          i++
        }
      }
    }

    for (const obj of response) {
      const prizeMoney = response.find(
        (each) => each.studentUUID === obj.studentUUID
      );
      const tournamentExamResult = await TournamentExamParticipationQuestion.findAll({
        where: {
          tournamentParticipationUUID: obj.uuid
        }
      })

      let correct = 0
      let incorrect = 0
      let answered = 0
      let skipped = 0
      let timeout = 0


      for (let o of tournamentExamResult) {
        if (o.isCorrect && o.status === "ANSWERED")
          correct += 1
        else if (o.isCorrect === false && o.status === "ANSWERED")
          incorrect += 1
        if (o.status === "ANSWERED")
          answered += 1
        else if (o.status === "SKIPPED")
          skipped += 1
        else if (o.status === "TIME_OUT")
          timeout += 1
      }

      const tornamentPrice = await TournamentPriceDistribution.findOne({
        where: {
          studentUUID: obj.studentUUID,
          tournamentScheduleUUID: obj.tournamentScheduleUUID,
        }
      })

      if (tornamentPrice) {
        await tornamentPrice.update({
          rank: prizeMoney.rank,
          amount: prizeMoney.coins + prizeMoney.prizeAmount,
          marks: obj.marks,
          name: obj.studentName,
          correct,
          incorrect,
          answered,
          skipped,
          timeout
        })
      }
      else {
        await TournamentPriceDistribution.create({
          studentUUID: obj.studentUUID,
          rank: prizeMoney.rank,
          tournamentScheduleUUID: obj.tournamentScheduleUUID,
          amount: prizeMoney.coins + prizeMoney.prizeAmount,
          marks: obj.marks,
          name: obj.studentName,
          correct,
          incorrect,
          answered,
          skipped,
          timeout
        });
      }

      await TournamentParticipation.update({ marks: obj.marks }, {
        where: {
          uuid: obj.uuid,
        }
      })
    }
  }

  await instance.connection.connectionManager.close();

  return {
    body: JSON.stringify({ ok: true }),
    statusCode: 200,
  };
};