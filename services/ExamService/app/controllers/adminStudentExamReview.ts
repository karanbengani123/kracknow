import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Exam, ExamSchedule, ExamKeyword, Student, ScheduleExamParticipation, ExamParticipationQuestion, ExamParticipationQuestionOption, Question, QuestionOption } from '../../../../shared/database/models'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'

export const adminExamReview = async (params: IControllerParams<{}>) => {
  const schedule = await ExamSchedule.findOne({
    where: {
      uuid: params.args.params.examScheduleUUID
    }
  })

  const exam = await Exam.findOne({
    where: {
      uuid: schedule.examUUID
    },
    include: [{
      model: ExamKeyword,
      as: 'examKeyword'
    }]
  })

  const student = await ScheduleExamParticipation.findOne({
    where: {
      examScheduleUUID: params.args.params.examScheduleUUID,
      studentUUID: params.args.params.studentUUID
    },
    include: [{
      model: Student,
      as: 'participatedStudents',
      attributes: ['uuid', 'firstName', 'lastName']
    }, {
      model: ExamParticipationQuestion,
      as: 'questionOptions',
      attributes: ['givenAnswer'],
      include: [{
        model: Question,
        as: 'questionsDetails',
        attributes: ['uuid', 'title']
      }, {
        model: ExamParticipationQuestionOption,
        as: 'examParticipation'
      }]
    }]
  })

  const correctCount = await ExamParticipationQuestion.count({
    where: {
      examParticipationUUID: student.uuid,
      isCorrect: true
    }
  })

  const inCorrectCount = await ExamParticipationQuestion.count({
    where: {
      examParticipationUUID: student.uuid,
      isCorrect: false
    }
  })

  const skipped = await ExamParticipationQuestion.count({
    where: {
      examParticipationUUID: student.uuid,
      status: 'SKIPPED'
    }
  })

  const timeOut = await ExamParticipationQuestion.count({
    where: {
      examParticipationUUID: student.uuid,
      status: 'TIME_OUT'
    }
  })
  const questions = []
  for (const obj of student.questionOptions) {
    const options = await QuestionOption.findOne({
      where: {
        isCorrect: true,
        questionUUID: obj.questionsDetails.uuid
      },
      attributes: ['text', 'image']
    })
    const data = {
      givenAnswer: obj.givenAnswer,
      question: obj.questionsDetails.title,
      options: obj.examParticipation,
      correctAnswer: options
    }
    questions.push(data)
  }
  const data = {
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    marks: student.marks,
    examTitle: exam.title,
    studentLimit: exam.studentLimit,
    markPerQuestion: exam.markPerQuestion,
    joininngFees: exam.joinFee,
    timeLimit: exam.timePerQuestion,
    status: schedule.status,
    isFeatured: exam.isFeatured,
    keywords: exam.examKeyword,
    description: exam.description,
    marksPerQuestion: exam.marksPerQuestion,
    firstName: student.participatedStudents.firstName,
    lastName: student.participatedStudents.lastName,
    correctCount: correctCount,
    inCorrectCount: inCorrectCount,
    skipped: skipped,
    timeOut: timeOut,
    question: questions
  }

  return {
    message: SUCCESSFUL,
    payload: {
      response: data
    }
  }
}
