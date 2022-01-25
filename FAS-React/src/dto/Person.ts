import { MetaData } from "./meta/MetaData";

export class Person extends MetaData {
    firstName: string | null = null
    lastName: string | null = null

    date: Date | null = null
    sex: string | null = null

    fullName: string | null = this.firstName + " " + this.lastName
}
