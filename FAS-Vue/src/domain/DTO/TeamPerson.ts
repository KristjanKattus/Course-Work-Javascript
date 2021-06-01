import { MetaData } from "@/domain/meta/MetaData";
import { Team } from "./Team";
import { Role } from "./Role";
import { Person } from "./Person";

export class TeamPerson extends MetaData {

    personId: string | null = null
    person: Person | null = null

    teamId: string | null = null
    team: Team | null = null

    roleId: string | null = null
    role: Role | null = null
}
