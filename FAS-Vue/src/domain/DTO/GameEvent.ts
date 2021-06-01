import { MetaData } from "@/domain/meta/MetaData";
import { Game } from "./Game";
import { GameTeamList } from "./GameTeamList";
import { EventType } from "./EventType";

export class GameEvent extends MetaData {
    gameId: string | null = null
    game: Game | null = null

    gameTeamListId: string | null = null
    gameTeamList: GameTeamList[] | null = null

    eventTypeId: string | null = null
    eventType: EventType | null = null

    gameTime: number | null = null
    numberInOrder: number = 1
}
