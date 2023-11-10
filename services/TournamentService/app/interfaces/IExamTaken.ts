export interface IExamTaken {
    examParticipationUUID: string
    questionUUID: string
    title: string
    status: string
    givenAnswer: string
    options: any[]
    description: string
    examUUID: string
    categoryType: string
    time: string
    isLastRecord: boolean
}
