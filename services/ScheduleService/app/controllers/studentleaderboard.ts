import { Op } from 'sequelize'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import {
  ExamPriceRatio,
  ScheduleExamParticipation,
  Student
} from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const studentLeaderBoard = async (params: IControllerParams<{}>) => {
  const leaderBoardCount = await ScheduleExamParticipation.findAll({
    where: {
      examScheduleUUID: params.args.params.examScheduleUUID,
      status: "COMPLETED",
    },
    attributes: ["uuid", "marks", "examUUID", "coins"],
    include: [
      {
        model: Student,
        as: "participatedStudents",
        attributes: ["uuid", "firstName"],
      },
    ],
    order: [
      ["marks", "DESC"],
      ["updatedAt", "ASC"],
      ["answeredMilliSeconds", "ASC"],
    ],
  });

  const priceRatio = await ExamPriceRatio.findAll({
    where: {
      examUUID: leaderBoardCount[0].examUUID,
      amount: { [Op.ne]: 0 }
    },
    order: [['toValue', 'ASC']]
  })

  const length = priceRatio.length
  let i = 0
  const response = []
  for (const obj of leaderBoardCount) {
    if (i < length && priceRatio[i].fromValue === 0) {
      const data = {
        uuid: obj.uuid,
        marks: obj.marks,
        studentUUID: obj.participatedStudents.uuid,
        studentName: obj.participatedStudents.firstName,
        prizeAmount: priceRatio[i].amount,
        rank: i + 1,
        coins: obj.coins
      }
      response.push(data)
      i++
    }
    if (i < length && priceRatio.length && priceRatio[i].fromValue > 0) {
      const data = {
        uuid: obj.uuid,
        marks: obj.marks,
        studentUUID: obj.participatedStudents.uuid,
        studentName: obj.participatedStudents.firstName,
        prizeAmount: priceRatio[i].amount,
        rank: i + 1,
        coins: obj.coins
      }
      response.push(data)
      i++
    } else {
      const temp = response.find(
        (each) => each.studentUUID === obj.participatedStudents.uuid
      )
      console.log(temp)
      if (!temp) {
        const data = {
          uuid: obj.uuid,
          marks: obj.marks,
          studentUUID: obj.participatedStudents.uuid,
          studentName: obj.participatedStudents.firstName,
          prizeAmount: 0,
          rank: i + 1,
          coins: obj.coins
        }
        response.push(data)
        i++
      }
    }
  }
  return {
    message: SUCCESSFUL,
    payload: {
      response: response
    }
  }
}
