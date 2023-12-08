export interface ICreateExam {
  title: string
  categoryUUID: string,
  description: string,
  allowPrimarySelection: boolean,
  allowSecondarySelection: boolean,
  isFeatured: boolean
  marksPerQuestion: number
  studentLimit: number
  isFree: boolean
  joinFee: number
  type: string
  joinDelay: number
  totalWinningPrize: number
  timePerQuestion: number
  ExamBanner: string
  phoneBanner: string
  ExamSchedule: any[]
  ExamCity: any[]
  ExamKeyword: any[]
  ExamQuestion: any[]
  ExamPrice: any[]
  ExamRankingFactor: any[]
}