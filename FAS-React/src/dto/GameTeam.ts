import { MetaData } from "./meta/MetaData";
import { Game } from "./Game";
import { Team } from "./Team";

export class GameTeam extends MetaData {

    gameId: string =""
    game: Game | null = null

    teamId: string | null = null
    team: Team | null = null

    homeTeam: boolean | null = null

    scored: number | null = null
    conceded: number | null = null
    points: number | null = null
}