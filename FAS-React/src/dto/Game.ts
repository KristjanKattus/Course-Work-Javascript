import { MetaData } from "./meta/MetaData";
import { Stadium } from "./Stadium";
import { GameEvent } from "./GameEvent";

export class Game extends MetaData {
    stadiumId: string | null = null
    stadium: Stadium | null = null

    leagueId: string | null = null

    gameLength: number = 90

    gameEvents: GameEvent[] | null = null

    matchRound: number | null = null
}
