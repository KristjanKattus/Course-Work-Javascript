import { MetaData } from "./meta/MetaData";
import { TeamPerson } from "./TeamPerson";

export class AddGameMember extends MetaData {
    personId: string | null = null
    person: TeamPerson | null =null

    partOfGame: boolean | null = null
    inStartingLineup: boolean | null = null
    staff: boolean | null = null
}
