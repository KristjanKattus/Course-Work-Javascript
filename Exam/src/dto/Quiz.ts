import { MetaData } from "./meta/MetaData"
import { Question } from "./Question"

export class Quiz extends MetaData{

    value: string | null = null

    categoryId: string | null = null

    poll: boolean | null = null

    submitted: boolean | null = null

    timesAttempted: number | null = null

    cleared: number | null = null

    numberOfQuestions: number | null = null

    percentage: number | null = null

    questions: Question[] | null = null


}