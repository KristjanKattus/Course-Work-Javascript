import { MetaData } from "./meta/MetaData"
import { Quiz } from "./Quiz"

export class Category extends MetaData {
    value: string | null = null

    quizzes: Quiz[] = []

    quizCount: number | null = null

    totalQuizAttempts: number | null = null

    quizzesCleared: number | null = null

    percentage: number | null = null
}