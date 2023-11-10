import { Op } from 'sequelize'
import {
  Exam,
  ExamPriceRatio,
  ScheduleExamParticipation,
  Student,
  UserDeviceToken,
  Wallet,
  WalletTransaction,
  ExamPriceDistribution,
  PrizeAmountHistory
} from '../../shared/database/models'
import { sendMessageToClient } from './sendNotification'
import { COMPLETED, EARNED_COIN, EARNED_PRIZE, INBOUND, SUCCESS } from "../../shared/constants/message";
import { v4 } from "uuid";

export const examLeaderBoard = async (examScheduleUUID: string, examType: string) => {
  const leaderBoardCount = await ScheduleExamParticipation.findAll({
    where: {
      examScheduleUUID,
      status: COMPLETED
    },
    attributes: ['uuid', 'marks', 'examUUID', 'studentUUID', 'coins', 'examScheduleUUID'],
    include: [
      {
        model: Student,
        as: 'participatedStudents',
        attributes: ['uuid', 'firstName']
      }
    ],
    order: [['marks', 'DESC'], ['updatedAt', 'ASC'], ['answeredMilliSeconds', 'ASC']]
  })
  const response = []
  if (leaderBoardCount.length) {
    const priceRatio = await ExamPriceRatio.findAll({
      where: {
        examUUID: leaderBoardCount[0].examUUID,
        amount: { [Op.ne]: 0 }
      },
      order: [['toValue', 'ASC']]
    })

    const length = priceRatio.length
    let i = 0

    for (const obj of leaderBoardCount) {
      obj.coins = obj.coins / 100
      if (i < length && priceRatio[i].fromValue === 0) {
        response.push({
          uuid: obj.uuid,
          examUUID: obj.examUUID,
          marks: obj.marks,
          studentUUID: obj.participatedStudents.uuid,
          studentName: obj.participatedStudents.firstName,
          examScheduleUUID: obj.examScheduleUUID,
          prizeAmount: priceRatio[i].amount,
          rank: i + 1,
          coins: obj.coins
        })
        i++
      }
      if (i < length && priceRatio.length && priceRatio[i].fromValue > 0) {
        response.push({
          uuid: obj.uuid,
          examUUID: obj.examUUID,
          marks: obj.marks,
          studentUUID: obj.participatedStudents.uuid,
          studentName: obj.participatedStudents.firstName,
          examScheduleUUID: obj.examScheduleUUID,
          prizeAmount: priceRatio[i].amount,
          rank: i + 1,
          coins: obj.coins
        })
        i++
      } else {
        const temp = response.find(
          (each) => each.studentUUID === obj.participatedStudents.uuid
        )

        if (!temp) {
          response.push({
            uuid: obj.uuid,
            examUUID: obj.examUUID,
            marks: obj.marks,
            studentUUID: obj.participatedStudents.uuid,
            studentName: obj.participatedStudents.firstName,
            examScheduleUUID: obj.examScheduleUUID,
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
        examScheduleUUID: obj.examScheduleUUID,
        scheduleExamParticipationUUID: obj.uuid
      }
    })

    if (!prizeAmountHistory) {
      await PrizeAmountHistory.create({
        studentUUID: obj.studentUUID,
        examScheduleUUID: obj.examScheduleUUID,
        scheduleExamParticipationUUID: obj.uuid
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
        const exam = await Exam.findByPk(obj.examUUID, { attributes: ["uuid", "title"] })
        await WalletTransaction.bulkCreate([{
          examType,
          examTitle: exam.title,
          examUUID: exam.uuid,
          walletUUID: wallet.uuid,
          paymentMode: EARNED_COIN,
          orderId: v4().split("-")[4],
          referenceId: v4().split("-")[4],
          amount: prizeMoney.coins,
          type: INBOUND,
          status: SUCCESS,
          paymentDate: now,
        }, {
          examType,
          examTitle: exam.title,
          examUUID: exam.uuid,
          walletUUID: wallet.uuid,
          paymentMode: EARNED_PRIZE,
          orderId: v4().split("-")[4],
          referenceId: v4().split("-")[4],
          amount: prizeMoney.prizeAmount,
          type: INBOUND,
          status: SUCCESS,
          paymentDate: now,
        }]);

        await ExamPriceDistribution.create({
          studentUUID: obj.studentUUID,
          rank: prizeMoney.rank,
          examScheduleUUID: examScheduleUUID,
          amount: prizeMoney.coins + prizeMoney.prizeAmount,
        });
      }
    }
  }
  response.map(async (data) => {
    const exam = await Exam.findOne({
      where: {
        uuid: data.examUUID
      },
      attributes: ['type', 'title']
    })
    const token = await UserDeviceToken.findOne({
      where: {
        userId: data.studentUUID
      },
      attributes: ['token']
    })
    if (token) {
      sendMessageToClient(token.token, `Congratulations! You won Rs.${data.prizeAmount + data.coins} for ${exam.type} - ${exam.title}`)
    }
  })
}
