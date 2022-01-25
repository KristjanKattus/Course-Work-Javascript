import { MetaData } from "./meta/MetaData"

export class Answer extends MetaData {

    questionId: string | null = null

    value: string = ""

    correctAnswer: boolean = false

    checked: boolean | null = null
}