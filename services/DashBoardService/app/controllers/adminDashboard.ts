import {
  Student,
  Tournament,
  Exam,
  ExamCity,
  TournamentCity,
} from '../../../../shared/database/models'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import moment from 'moment'
import { Op } from 'sequelize'

export const adminDashboard = async (params: IControllerParams<null>) => {
  const cityUUID = params.args.queryString.cityUUID
  const whereCondition = {
    where: {
      type: 'EXAM',
    },
  }
  if (cityUUID) {
    Object.assign(whereCondition, {
      include: [
        {
          model: ExamCity,
          as: 'examCity',
          separate: false,
          where: {
            cityUUID,
          },
        },
      ],
    })
  }
  const students = await Student.count(
    cityUUID
      ? {
        where: {
          cityUUID
        },
      }
      : {}
  )
  const tournaments = await Tournament.count(
    cityUUID
      ? {
        include: [
          {
            model: TournamentCity,
            as: 'tournamentCities',
            separate: false,
            where: {
              cityUUID,
            },
          },
        ],
      }
      : {}
  )
  const examsCount = await Exam.count(whereCondition)
  whereCondition.where.type = 'QUIZ'
  const quizCount = await Exam.count(whereCondition)
  whereCondition.where.type = 'MOCK_TEST'
  const mockTestCount = await Exam.count(whereCondition)


  const data = {
    students,
    tournaments,
    examsCount,
    quizCount,
    mockTestCount,
    chart: [],
  }
  if (cityUUID) {
    for (let i = 0; i <= 5; i++) {
      const subYear = moment.utc().startOf('year').subtract(i, 'year')
      data.chart.push({
        year: subYear.year(),
        count: await Student.count({
          where: {
            cityUUID,
            createdAt: {
              [Op.gt]: subYear.format(),
              [Op.lt]: moment.utc().endOf('year').subtract(i, 'year').format(),
            },
          },
        }),
      })
    }
  }

  return {
    message: SUCCESSFUL,
    payload: data,
  }
}
