import { MetaData } from "./meta/MetaData";
import { Game } from "./Game";
import { GameTeam } from "./GameTeam";
import { GameTeamList } from "./GameTeamList";

export class LeagueGame extends MetaData {
    game: Game | null = null

    homeTeam: GameTeam | null = null
    homeTeamList: GameTeamList[] | null = null

    awayTeam: GameTeam | null = null
    awayTeamList: GameTeamList[] | null = null
    static homeTeam: any;
}
