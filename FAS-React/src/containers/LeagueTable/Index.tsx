import { isEmptyObject } from "jquery";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { LeagueTableClient } from "../../dto/LeagueTableClient"
import { IRouteId } from "../../types/IRouteId";
import { Team } from "../../dto/Team";
import { LeagueTableTeam } from "../../dto/LeagueTableTeam";
import { LeagueGame } from "../../dto/LeagueGame";


const RowDisplay = (props: { team: LeagueTableTeam }) => {
    return (
    <>
        <td>{props.team.leagueTeamName }</td>
        <td>{props.team.gamesPlayed }</td>
        <td>{props.team.gamesWon }</td>
        <td>{props.team.gamesLost }</td>
        <td>{props.team.gamesTied }</td>
        <td>{props.team.goalsScored }</td>
        <td>{props.team.goalsConceded }</td>
        <td>{props.team.points }</td>
    </>);
} 

const RowDisplay2 = (props: { game: LeagueGame }) => {
    return (
    <>
        <td>{ props.game!.homeTeam!.team!.name }</td>
        <td>{ props.game!.homeTeam!.scored }</td>
        <td>:</td>
        <td>{ props.game.awayTeam!.scored }</td>
        <td>{ props.game.awayTeam!.team!.name }</td>
        <td className="">
            <div className="d-sm-flex align-items-center justify-content-center">Stadium</div>
        </td>
        <td>
            <Link className="btn btn-info btn-circle" to={'/Game/Details/' + props.game.game!.id}>
                <i className="fas fa-info-circle">I</i>
            </Link>
        </td>
    </>);
}

const LeagueTableIndex = () => {
    const { id } = useParams() as IRouteId;
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);
    const [leagueTableClient, setLeagueTableClient] = useState({} as LeagueTableClient);

    const loadData = async () => {
        let result = await BaseService.get<LeagueTableClient>("/LeagueTable/" + id);
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setLeagueTableClient(result.data)
            
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if(!isEmptyObject(leagueTableClient)){
        return (
            <>
             <div className="d-sm-flex align-items-center justify-content-center">
                    <div className="card shadow mb-2">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">{leagueTableClient.leagueName}</h6>
                        </div>
                        <div className="card-body">
                            <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info">
                                            <thead>
                                            <tr role="row">
                                                <th rowSpan={1} colSpan={1}>LeagueTeamName</th>
                                                <th rowSpan={1} colSpan={1}>GamesPlayed</th>
                                                <th rowSpan={1} colSpan={1}>GamesWon</th>
                                                <th rowSpan={1} colSpan={1}>GamesLost</th>
                                                <th rowSpan={1} colSpan={1}>GamesTied</th>
                                                <th rowSpan={1} colSpan={1}>GoalsScored</th>
                                                <th rowSpan={1} colSpan={1}>GoalsConceded</th>
                                                <th rowSpan={1} colSpan={1}>Points</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {leagueTableClient.leagueTableTeams!.map(team => 
                                                <tr key={team.leagueTeamName!.toString()}>
                                                    <RowDisplay team={team}/>
                                                </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row"></div>
                <div className="d-sm-flex align-items-center justify-content-center">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Games</h6>
                        </div>
                        <div className="card-body">
                            <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <table className="table table-bordered dataTable" id="dataTable" width={100} cellSpacing={0} role="grid" aria-describedby="dataTable_info">
                                            <thead className="text-center">
                                            <tr role="row">
                                                <th rowSpan={1} colSpan={1}>HomeTeam</th>
                                                <th rowSpan={1} colSpan={1}></th>
                                                <th rowSpan={1} colSpan={1}></th>
                                                <th rowSpan={1} colSpan={1}></th>
                                                <th rowSpan={1} colSpan={1}>AwayTeam</th>
                                                <th rowSpan={1} colSpan={1}>Stadium</th>
                                                <th rowSpan={1} colSpan={1}></th>
                                            </tr>
                                            </thead>
                                            <tbody className="text-center ">
                                                {leagueTableClient.leagueGames!.map(game => 
                                                <tr key={game.game!.id.toString()}>
                                                    <RowDisplay2 game={game}/>
                                                </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }else{
        return (
            <>
                <Loader {...pageStatus} />
            </>
        );
    }
}
export default LeagueTableIndex;
