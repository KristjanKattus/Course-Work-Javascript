import { MetaData } from "@/domain/meta/MetaData";
import { TeamPerson } from "./TeamPerson";

export class Team extends MetaData {

    name: string | null = null

    teamPersons: TeamPerson[] | null = null

}