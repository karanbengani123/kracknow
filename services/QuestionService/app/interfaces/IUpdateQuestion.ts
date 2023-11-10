import { IAddQuestion } from './IAddQuestion'

export interface IUpdateQuestion extends IAddQuestion{
    id: string
    key: string
    image: string
    text: string
    isCorrect: string
}
