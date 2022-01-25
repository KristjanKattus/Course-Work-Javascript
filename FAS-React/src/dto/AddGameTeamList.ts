import { MetaData } from "./meta/MetaData";
import { AddGameMember } from "./AddGameMember";

export class AddGameTeamList extends MetaData {
    gameTeamId:string | null = null
    gameTeamName: string | null = null
    playerlist: AddGameMember[] | null = null
    staffList: AddGameMember[] | null = null
}