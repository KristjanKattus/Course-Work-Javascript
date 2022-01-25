import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import Alert, { EAlertClass } from "../../components/Alert";
import { Redirect, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { IFormProps } from "../../types/IFormProps";
import { Quiz } from "../../dto/Quiz"


const initialFormValues: Quiz = new Quiz();

const FormView = (props: IFormProps<Quiz>) => {
    const validationTemplate = {
        error: "",
        value: ""
    }
    const [submit, setSubmit] = useState("");

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [alertMessage, setAlertMessage] = useState(validationTemplate);
    const appState = useContext(AppContext);

    const loadData = async () => {
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleValidation = () => {
        let formIsValid = true;

        setAlertMessage(validationTemplate);

        if(!props.values.value){
            setAlertMessage(prevState => ({
                ...prevState,
                amount: "Name can not be empty"
            }));
            formIsValid = false;
        }

       return formIsValid;
   }

    const createSubmit = async (e: Event) => {
        e.preventDefault();

        if (!handleValidation()) {
            return;
        }

        // let response = await BaseService.post("Quiz", props.values, appState.token!);
        // if (!response.ok) {
        //     setAlertMessage(prevState => ({
        //         ...prevState,
        //         error: response.messages!
        //     }));

        // } else {
        //     setSubmit(response.data!.id);
        // }
    }

    return (
        <>
        {/* { submit !== "" ? <Redirect to={'/Quiz/' + submit} /> : null} */}
        <form>
            <Alert show={alertMessage.error !== ''} message={alertMessage.error} alertClass={EAlertClass.Danger} />
           
            <div className="form-group">
                <label className="control-label">Amount</label>
                <input value={props.values.value ?? ""} onChange={(e) => props.handleChange(e.target)} type="string" placeholder="" className="form-control" id="value" />
                <Alert show={alertMessage.value !== ''} message={alertMessage.value} alertClass={EAlertClass.Danger} />
            </div>

            <div className="form-group">
                <button type="submit" onClick={(e) => createSubmit(e.nativeEvent)} className="btn btn-primary">Create</button>
            </div>
        </form>
        <Loader {...pageStatus} />
        </>
    );
}


const QuizCreate = () => {

    const [formValues, setFormValues] = useState(initialFormValues);

    useEffect(() => {
    }, []);

    const handleChange = (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
        switch (target.id) {
            case 'value':
                setFormValues({ ...formValues, value: target.value });
                return;
        }
    }
    return (
        <>
            <h1>Create</h1>
            <h4>Quiz</h4>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <FormView values={formValues} handleChange={handleChange} />
                </div>
            </div>
        </>
    )

}

export default QuizCreate;