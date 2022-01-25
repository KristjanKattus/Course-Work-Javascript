import { MetaData } from "./meta/MetaData"
import { Quiz } from "./Quiz"
import { Answer } from "./Answer"

export class Question extends MetaData {

    quizId: string | null = null
    quiz: Quiz | null = null

    value: string = ""

    checkedAnswerId: string | null = null

    answers: Answer[] = []

    categoryId: string | null = null

}