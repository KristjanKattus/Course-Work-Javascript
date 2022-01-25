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
import { GameEvent } from "../../dto/GameEvent"
import { TeamPerson } from "../../dto/TeamPerson";
import { GameTeamList } from "../../dto/GameTeamList";


const RowDisplay = (props: { gameEvent: GameEvent, leagueGame: LeagueGame}) => {
    return (
    <>
        <td>{ props.gameEvent.gameTime }</td>
        <td>{ props.gameEvent.eventType!.name }</td>
        <td>{ props.gameEvent.gameTeamList!.teamPerson!.person!.fullName }</td>
        <td>
            <div>{props.gameEvent.gameTeamList!.gameTeamId == props.leagueGame.homeTeam!.id? props.leagueGame.homeTeam!.team!.name :props.leagueGame.awayTeam!.team!.name }</div>
        </td>
    </>);
} 

const RowDisplay2 = (props: { person: GameTeamList }) => {
    return (
    <>
        <td rowSpan={1} colSpan={1}>{ props.person.teamPerson!.person!.firstName }</td>
        <td rowSpan={1} colSpan={1}>{ props.person.teamPerson!.person!.lastName }</td>
    </>);
}

const GameDetails = () => {
    const { id } = useParams() as IRouteId;
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);
    const [leagueGame, setLeagueGame] = useState({} as LeagueGame);
    const [gameEvents, setGameEvents] = useState([] as GameEvent[])

    const loadData = async () => {
        let resultLeagueGame = await BaseService.get<LeagueGame>("/LeagueTeam/" + id)
        let resultGameEvent = await BaseService.getAll<GameEvent>("/GameEvent/gameId=" + resultLeagueGame.data?.game?.id)
        if (resultLeagueGame.ok && resultLeagueGame.data && resultGameEvent.ok && resultGameEvent.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setLeagueGame(resultLeagueGame.data);
            setGameEvents(resultGameEvent.data)
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: resultLeagueGame.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if(!isEmptyObject(leagueGame)){
        return (
            <>
                <div className="d-sm-flex align-items-center justify-content-center">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <div className="row d-sm-flex justify-content-between">
                                <h4 className="m-0 font-weight-bold text-primary">{ leagueGame.homeTeam!.team!.name }</h4>
                                <div className="d-sm-flex align-items-center justify-content-center">
                                    <h4 className="m-0 font-weight-bold text-primary">{ leagueGame.homeTeam!.scored }</h4>
                                    <h4 className="m-0 font-weight-bold text-primary">:</h4>
                                    <h4 className="m-0 font-weight-bold text-primary">{ leagueGame.awayTeam!.scored }</h4>
                                </div>
                                <h4 className="m-0 font-weight-bold text-primary">{leagueGame.awayTeam!.team!.name }</h4>
                            </div>
                        </div>
                        <div className="card-body">
                            <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                            <div className="row d-sm-flex align-items-center justify-content-between">
                                {appState.role==="Admin" || appState.role === "Referee"?
                                
                                <Link to={'/GameEvent/' + leagueGame.homeTeam!.id} className="btn btn-primary">
                                    <span className="icon text-white-50">
                                        <i className="fas fa-flag"></i>
                                    </span>
                                    <span className="text">Add game event</span>
                                </Link>
                                : null}
                                {appState.role==="Admin" || appState.role === "Referee"?
                                
                                <Link to={'/GameEvent/' + leagueGame.awayTeam!.id} className="btn btn-primary">
                                    <span className="icon text-white-50">
                                        <i className="fas fa-flag"></i>
                                    </span>
                                    <span className="text">Add game event</span>
                                </Link>
                                : null}
                           </div>
                            <div className="row d-sm-flex align-items-center justify-content-center">
                                <div className="h2 text-black-800 text-center">Game events</div>
                                {gameEvents.length !== 0? 
                                <table className="table table-bordered dataTable" id="dataTable" cellSpacing={0} role="grid" aria-describedby="dataTable_info">
                                <thead>
                                <tr role="row">
                                    <th rowSpan={1} colSpan={1}>Game Time</th>
                                    <th rowSpan={1} colSpan={1}>GameEvents</th>
                                    <th rowSpan={1} colSpan={1}>Player</th>
                                    <th rowSpan={1} colSpan={1}>Team Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {gameEvents!.map(gameEvent => 
                                        <tr key={gameEvent.id.toString()}>
                                            <RowDisplay gameEvent={gameEvent} leagueGame={leagueGame}/>
                                        </tr>
                                        )}
                                </tbody>
                                </table>: null}
                                
                            </div>

                            <div className="row d-sm-flex align-items-center justify-content-center">

                                <div className="col-sm-6">
                                    <div className="h4 text-black-800 text-center">In starting lineup</div>

                                    <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info">
                                        <thead>
                                        <tr role="row">
                                            <th rowSpan={1} colSpan={1}>FirstName</th>
                                            <th rowSpan={1} colSpan={1}>LastName</th>
                                        </tr>
                                        </thead> 
                                        
                                         <tbody>
                                            {leagueGame.homeTeamList!.map(person => 
                                                person.inStartingLineUp?
                                                <tr key={person.id.toString()}>
                                                    <RowDisplay2 person={person}/>
                                                </tr>: null
                                            )}
                                            <tr>
                                                <td rowSpan={2} colSpan={2}>
                                                    <div className="h4 text-black-800 text-center">
                                                        Subsitutions
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr></tr>
                                            {leagueGame.homeTeamList!.map(person => 
                                                !person.inStartingLineUp && !person.staff?
                                                <tr key={person.id.toString()}>
                                                    <RowDisplay2 person={person}/>
                                                </tr>: null
                                            )}
                                            <tr role="row" className="text-center">
                                                <td rowSpan={2} colSpan={2}>
                                                    <div className="h4 text-black-800 text-center">
                                                        Staff
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr></tr>
    
                                            {leagueGame.homeTeamList!.map(person => 
                                                
                                                    person.staff?
                                                        person.person?
                                                        <tr key={person.id.toString()}>
                                                        <RowDisplay2 person={person}/>
                                                        </tr>
                                                        :
                                                        <tr>
                                                            <td rowSpan={1} colSpan={1}>{ person.person!.firstName }</td>
                                                            <td rowSpan={1} colSpan={1}>{ person.person!.lastName }</td>
                                                        </tr>
                                                    :null
                                                    
                                                
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="col-sm-6">

                                    <div className="h4 text-black-800 text-center">In starting lineup</div>

                                    <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info">
                                        <thead>
                                        <tr role="row">
                                            <th rowSpan={1} colSpan={1}>FirstName</th>
                                            <th rowSpan={1} colSpan={1}>LastName</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {leagueGame.awayTeamList!.map(person => 
                                                person.inStartingLineUp?
                                                <tr key={person.id.toString()}>
                                                    <RowDisplay2 person={person}/>
                                                </tr>: null
                                            )}
                                            <tr>
                                                <td rowSpan={2} colSpan={2}>
                                                    <div className="h4 text-black-800 text-center">
                                                        Subsitutions
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr></tr>
                                            {leagueGame.awayTeamList!.map(person => 
                                                !person.inStartingLineUp && !person.staff?
                                                <tr key={person.id.toString()}>
                                                    <RowDisplay2 person={person}/>
                                                </tr>: null
                                            )}
                                            <tr role="row" className="text-center">
                                                <td rowSpan={2} colSpan={2}>
                                                    <div className="h4 text-black-800 text-center">
                                                        Staff
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr></tr>
    
                                            {leagueGame.awayTeamList!.map(person => 
                                                
                                                    person.staff?
                                                        person.person?
                                                        <tr key={person.id.toString()}>
                                                        <RowDisplay2 person={person}/>
                                                        </tr>
                                                        :
                                                        <tr>
                                                            <td rowSpan={1} colSpan={1}>{ person.person!.firstName }</td>
                                                            <td rowSpan={1} colSpan={1}>{ person.person!.lastName }</td>
                                                        </tr>
                                                    :null
                                                    
                                                
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
export default GameDetails;
