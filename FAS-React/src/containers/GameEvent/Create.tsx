import React, { useEffect, useState} from "react";
import { useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import Alert, { EAlertClass } from "../../components/Alert";
import { AppContext } from "../../context/AppContext";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import Loader from "../../components/Loader";
import { IFormProps } from "../../types/IFormProps";
import { GameEvent } from "../../dto/GameEvent";
import { IRouteId } from "../../types/IRouteId";
import { IRouteGameId } from "../../types/IRouteGameId";
import { GameTeamList } from "../../dto/GameTeamList";
import {EventType} from "../../dto/EventType";
import { prototype } from "react-datetime";

const initialFormValues: GameEvent = {
    id: "00000000-0000-0000-0000-000000000000",
    createdBy: "-",
    createAt: "0001-01-01T00:00:00",
    updateBy: "-",
    updatedAt: "0001-01-01T00:00:00",
    gameId: "00000000-0000-0000-0000-000000000000",
    game: null,
    gameTeamListId: "00000000-0000-0000-0000-000000000000",
    gameTeamList: null,
    eventTypeId:"00000000-0000-0000-0000-000000000000",
    eventType:null,
    gameTime:0,
    numberInOrder:1
}

const FormView = (props: IFormProps<GameEvent>) => {
    const validationTemplate = {
        error: "",
        eventType: "",
        gameTime: "",
        gameTeamList: ""
        
    }

    const { id } = useParams() as IRouteId;
    const [submit, setSubmit] = useState("");
    const {gameId} = useParams() as IRouteGameId
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [alertMessage, setAlertMessage] = useState(validationTemplate);
    const [gameTeamList, setGameTeamList] = useState([] as GameTeamList[])
    const [eventTypes, setEventTypes] = useState([] as EventType[])
    const appState = useContext(AppContext);

    const loadData = async () => {
        let returnGTL = await BaseService.getAll<GameTeamList>("GameTeamList/gameTeamId=" + id, appState.token!)
        let returnGEType = await BaseService.getAll<EventType>("EventType", appState.token!)

        if (returnGTL.ok && returnGTL.data &&
            returnGEType.ok && returnGEType.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setGameTeamList(returnGTL.data);
            setEventTypes(returnGEType.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: returnGTL.statusCode });
        }
    }

    const handleValidation = () => {
        let formIsValid = true;

        setAlertMessage(validationTemplate);

        if(!props.values.gameTeamList){
            setAlertMessage(prevState => ({
                ...prevState,
                gameTeamList: "Game team list field can not be empty!"
            }));
            formIsValid = false;
        }

        if(!props.values.eventType){
            setAlertMessage(prevState => ({
                ...prevState,
                eventType: "Event type field can not be empty!"
            }));
            formIsValid = false;
        }

        if(props.values.gameTime === 0){
            setAlertMessage(prevState => ({
                ...prevState,
                gameTime: "Game time field can not be empty!"
            }));
            formIsValid = false;
        }

       return formIsValid;
   }

    const createSubmit = async (e: Event) => {
        e.preventDefault();
        props.values.gameId = gameTeamList[0].gameTeam!.gameId;
        let response = await BaseService.post("GameEvent", props.values, appState.token!);
        if (!response.ok) {
            setAlertMessage(prevState => ({
                ...prevState,
                "error": response.messages!
            }));
        } else {
            setSubmit(response.data!.gameId!);
        }
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {submit !== "" ? <Redirect to={'/Game/Details/' + submit} /> : null}
            <form>
                <Alert show={alertMessage.error !== ''} message={alertMessage.error} alertClass={EAlertClass.Danger} />
                <div className="form-group">
                    <label className="control-label">Event type</label>
                    <select value={props.values.eventTypeId ?? ""} onChange={(e) => props.handleChange(e.target)} className="form-control" id="eventType">
                        <option></option>
                        {eventTypes.map(eventType => {
                            return <option key={eventType.id} value={eventType.id}>{eventType.name}</option>
                        })}
                    </select>
                    <Alert show={alertMessage.eventType !== ''} message={alertMessage.eventType} alertClass={EAlertClass.Danger} />
                </div>

                <div className="form-group">
                    <label className="control-label">Player</label>
                    <select value={props.values.gameTeamListId ?? ""} onChange={(e) => props.handleChange(e.target)} className="form-control" id="gameTeamList">
                        <option></option>
                        {gameTeamList.map(player => {
                            return <option key={player.id} value={player.id}>{player.teamPerson!.person!.fullName}</option>
                        })}
                    </select>
                    <Alert show={alertMessage.gameTeamList !== ''} message={alertMessage.gameTeamList} alertClass={EAlertClass.Danger} />
                </div>

                <div className="form-group">
                <label className="control-label">Gametime</label>
                <input value={props.values.gameTime ?? 0} onChange={(e) => props.handleChange(e.target)} type="number" step="1" placeholder="0" className="form-control" id="gameTime" />
                
                </div>

                <div className="form-group">
                <label className="control-label">Number in order</label>
                <input value={props.values.numberInOrder ?? 0} onChange={(e) => props.handleChange(e.target)} type="number" step="1" placeholder="0" className="form-control" id="numberInOrder" />
                </div>

                <div className="form-group">
                    <button type="submit" onClick={(e) => createSubmit(e.nativeEvent)} className="btn btn-primary">Create</button>
                </div>
            </form>
            <Loader {...pageStatus} />
        </>
    );
}


const GameEventCreate = () => {
    const { id } = useParams() as IRouteId;
    const [formValues, setFormValues] = useState(initialFormValues);
    const [gameEvent, setGameEvent] = useState({} as GameEvent);
    useEffect(() => {

            setGameEvent(new GameEvent)
            

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
        switch (target.id) {
            case 'gameTeamList':
                setFormValues({ ...formValues, gameTeamListId: target.value });
                return
            case 'eventType':
                setFormValues({ ...formValues, eventTypeId: target.value });
                return
            case 'gameTime':
                setFormValues({ ...formValues, gameTime: parseInt(target.value) });
                return
            case 'numberInOrder':
                setFormValues({ ...formValues, numberInOrder: parseInt(target.value) });
                return
        }
    }

    return (
        <>
            <h1>Create</h1>
            <h4>Game Event</h4>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <FormView values={formValues} handleChange={handleChange} />
                </div>
            </div>
        </>
    )

}

export default GameEventCreate;