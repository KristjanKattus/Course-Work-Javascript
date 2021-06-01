import { MetaData } from "@/domain/meta/MetaData";
import { AddGameMember } from "@/domain/DTO/AddGameMember";

export class AddGameTeamList extends MetaData {
    gameTeamId:string | null = null
    gameTeamName: string | null = null
    playerlist: AddGameMember[] | null = null
    staffList: AddGameMember[] | null = null
}