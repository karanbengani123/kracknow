import {
  UserDeviceToken,
  Wallet,
  WalletTransaction,
  PrizeAmountHistory,
  TournamentPriceRatio,
  TournamentPriceDistribution,
  TournamentExamParticipationQuestion,
} from '../../shared/database/models'
import { sendMessageToClient } from './sendNotification'
import { EARNED_COIN, EARNED_PRIZE, INBOUND, SUCCESS } from "../../shared/constants/message";
import { v4 } from "uuid";
import { Op } from 'sequelize'


export const tournamentLeaderBoard = async (leaderBoardCount: any) => {
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
      const title = obj.tournament[0].title
      const uuid = obj.uuid
      const marks = obj.marks
      const studentUUID = obj.studentUUID
      const studentName = obj.students[0].firstName + ' ' + obj.students[0].lastName
      const tournamentScheduleUUID = obj.tournamentScheduleUUID
      const prizeAmount = priceRatio[i]?.amount||0
      if (i < length && priceRatio[i]?.fromValue === 0) {
        response.push({
          uuid,
          title,
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
      if (i < length && priceRatio.length && priceRatio[i]?.fromValue > 0) {
        response.push({
          uuid,
          title,
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
            title,
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
  }

  for (const obj of response) {
    const prizeAmountHistory = await PrizeAmountHistory.findOne({
      where: {
        studentUUID: obj.studentUUID,
        tournamentParticipationUUID: obj.uuid
      }
    })
    if (!prizeAmountHistory) {
      await PrizeAmountHistory.create({
        studentUUID: obj.studentUUID,
        tournamentParticipationUUID: obj.uuid
      })
      const prizeMoney = response.find(
        (each) => each.studentUUID === obj.studentUUID
      );
      const wallet = await Wallet.findOne({
        where: {
          studentUUID: obj.studentUUID,
        },
      });
      if (wallet) {
        const now = new Date()
        await wallet.update({
          balance: wallet.balance + prizeMoney.coins + prizeMoney.prizeAmount,
        });
        await WalletTransaction.bulkCreate([{
          examType: "TOURNAMENT",
          examTitle: obj.title,
          tournamentUUID: leaderBoardCount[0].tournamentUUID,
          walletUUID: wallet.uuid,
          paymentMode: EARNED_COIN,
          orderId: v4().split("-")[4],
          referenceId: v4().split("-")[4],
          amount: prizeMoney.coins,
          type: INBOUND,
          status: SUCCESS,
          paymentDate: now,
        }, {
          examType: "TOURNAMENT",
          examTitle: obj.title,
          tournamentUUID: leaderBoardCount[0].tournamentUUID,
          walletUUID: wallet.uuid,
          paymentMode: EARNED_PRIZE,
          orderId: v4().split("-")[4],
          referenceId: v4().split("-")[4],
          amount: prizeMoney.prizeAmount,
          type: INBOUND,
          status: SUCCESS,
          paymentDate: now,
        }]);

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

        if (tournamentExamResult) {
          for (let o of tournamentExamResult) {
            if (o.isCorrect && o.status === "ANSWERED")
              correct += 1
            else if (o.isCorrect===false && o.status === "ANSWERED")
              incorrect += 1
            if (o.status === "ANSWERED")
              answered += 1
            else if (o.status === "SKIPPED")
              skipped += 1
            else if (o.status === "TIME_OUT")
              timeout += 1
          }
        }

        const tornamentPrice = await TournamentPriceDistribution.findOne({
          where: {
            studentUUID: obj.studentUUID,
            tournamentScheduleUUID: obj.tournamentScheduleUUID,
          }
        })
        if (!tornamentPrice)
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
    }
  }
  response.map(async (data) => {
    const token = await UserDeviceToken.findOne({
      where: {
        userId: data.studentUUID
      },
      attributes: ['token']
    })
    if (token) {
      try {
        sendMessageToClient(token.token, `Congratulations! You won Rs.${data.prizeAmount + data.coins} for Tournament - ${data.title}`)
      } catch (e) {
        console.log("sendMessageToClient********************")
      }
    }
  })
}
