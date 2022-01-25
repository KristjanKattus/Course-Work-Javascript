import { MetaData } from "./meta/MetaData";
import { TeamPerson } from "./TeamPerson";

export class Team extends MetaData {

    name: string | null = null

    teamPersons: TeamPerson[] | null = null

}