import { MetaData } from "./meta/MetaData";
import { LeagueTableTeam } from "./LeagueTableTeam";
import { LeagueGame } from "./LeagueGame";



export class LeagueTableClient extends MetaData {
    leagueName: string | null = null
    
    leagueTableTeams: LeagueTableTeam[] | null = null

    leagueGames: LeagueGame[] | null =  null
}