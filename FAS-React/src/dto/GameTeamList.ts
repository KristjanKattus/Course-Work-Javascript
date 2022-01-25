import { MetaData } from "./meta/MetaData";
import { Person } from "./Person";
import { TeamPerson } from "./TeamPerson";
import { GameTeam } from "./GameTeam";
import { Role } from "./Role";

export class GameTeamList extends MetaData {

    personId: string | null = null
    person: Person | null = null

    teamPersonId: string | null = null
    teamPerson: TeamPerson | null = null

    gameTeamId: string | null = null
    gameTeam: GameTeam | null = null

    roleId: string | null = null
    role: Role | null = null

    inStartingLineUp: boolean | null = null
    staff: boolean | null = null

}
