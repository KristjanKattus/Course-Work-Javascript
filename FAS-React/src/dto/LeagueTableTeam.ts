import { MetaData } from "./meta/MetaData";

export class LeagueTableTeam extends MetaData {
    leagueTeamName: string | null = null

    gamesPlayed: number | null = null

    gamesWon: number | null = null

    gamesLost: number | null = null

    gamesTied: number | null = null

    goalsScored: number | null = null

    goalsConceded: number | null = null

    points: number | null = null
}