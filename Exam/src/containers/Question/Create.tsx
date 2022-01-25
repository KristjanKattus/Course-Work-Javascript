import { useEffect, useState } from "react";
import { useContext } from "react";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import Alert, { EAlertClass } from "../../components/Alert";
import { Redirect, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { IFormProps } from "../../types/IFormProps";
import { Question } from "../../dto/Question";
import { AppContext } from "../../context/AppContext";
import { Answer } from "../../dto/Answer";
import { Quiz } from "../../dto/Quiz";
import { IRouteId } from "../../types/IRouteId";

interface IFormValues {
    quizId: string;
    questionText: string,
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    answer5: string;
    checkedAnswer: string
    poll:string
    categoryId:string
}

const initialFormValues: IFormValues = {
    quizId: "",
    questionText: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answer5: "",
    checkedAnswer: "",
    poll:"",
    categoryId:""
}

const FormView = (props: {quiz:Quiz, question: Question, answers: Answer[], handleChange:Function}) => {
    const validationTemplate = {
        quizId: "",
        questionText: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        answer5: "",
        checkedAnswer: "",
        poll:"",
        categoryId:""
    }

    const [submit, setSubmit] = useState(Boolean);
    const { id } = useParams() as IRouteId;
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

        if(!props.question.value){
            setAlertMessage(prevState => ({
                ...prevState,
                questionText: "Question field can not be empty!"
            }));
            formIsValid = false;
        }

        if(!props.answers[0].value){
            setAlertMessage(prevState => ({
                ...prevState,
                answer1: "Answer field can not be empty!"
            }));
            formIsValid = false;
        }

        if(!props.answers[1].value){
            setAlertMessage(prevState => ({
                ...prevState,
                answer2: "Answser field can not be empty!"
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
        console.log(props.quiz)
        console.log(props.question)
        props.question.quizId = props.quiz.id;
        props.question.answers = props.answers;
        let response = await BaseService.post("Question", props.question, appState.token!);
        if (!response.ok) {
            setAlertMessage(prevState => ({
                ...prevState,
                error: response.messages!
            }));
            console.log(response.messages)
        } else {
            setSubmit(true);
        }
    }

    return (
        <>
            {submit === true ? <Redirect to={'/Category/' + props.quiz.categoryId} /> : null}
            <form>
                <div className="form-group">
                    <label htmlFor="formInputText">Question</label>
                    <input value={props.question.value} onChange={(e) => props.handleChange(e.target)} type="text" className="form-control" id="question" />
                    <Alert show={alertMessage.questionText !== ''} message={alertMessage.questionText} alertClass={EAlertClass.Danger} />
                </div>
                <div className="form-row align-items-center">
                    <div className="col-9 my-1">
                        <label>Answer</label>
                        <input value={props.answers[0].value} onChange={(e) => props.handleChange(e.target)} type="text" className="form-control" id="0" />
                        <Alert show={alertMessage.answer1 !== ''} message={alertMessage.answer1} alertClass={EAlertClass.Danger} />
                    </div>
                    <div className="form-check align-middle">
                        <input checked={props.answers[0].correctAnswer} onChange={(e) => props.handleChange(e.target)} className="form-check-input" type="radio" id="0" value="true" />
                        <label className="form-check-label">Correct Answer</label>
                    </div>
                </div>
                <div className="form-row align-items-center">

                    <div className="col-9 my-1">
                    <label htmlFor="answer2">Answer</label>
                    <input value={props.answers[1].value} onChange={(e) => props.handleChange(e.target)} type="text" className="form-control" id="1" />
                    <Alert show={alertMessage.answer2 !== ''} message={alertMessage.answer2} alertClass={EAlertClass.Danger} />
                    </div>
                    <div className="form-check align-middle">
                        <input checked={props.answers[1].correctAnswer} onChange={(e) => props.handleChange(e.target)} className="form-check-input" type="radio" id="1" value="true" />
                        <label className="form-check-label">Correct Answer</label>
                    </div>
                    
                </div>
                <div className="form-row align-items-center">
                    <div className="col-9 my-1">
                    <label htmlFor="answer3">Answer</label>
                    <input value={props.answers[2].value} onChange={(e) => props.handleChange(e.target)} type="text" className="form-control" id="2" />
                    </div>
                    <div className="form-check align-middle">
                    <input checked={props.answers[2].correctAnswer} onChange={(e) => props.handleChange(e.target)} className="form-check-input" type="radio" id="2" value="true" />
                    <label className="form-check-label">Correct Answer</label>
                    </div>
                    
                </div>
                <div className="form-row align-items-center">
                    <div className="col-9 my-1">
                    <label htmlFor="answer4">Answer</label>
                    <input value={props.answers[3].value} onChange={(e) => props.handleChange(e.target)} type="text" className="form-control" id="3" />
                    </div>
                    

                    <div className="form-check align-middle">
                    <input checked={props.answers[3].correctAnswer} onChange={(e) => props.handleChange(e.target)} className="form-check-input" type="radio" id="3" value="true"/>
                    <label className="form-check-label">Correct Answer</label>
                    </div>
                    
                </div>
                <div className="form-row align-items-center">
                    <div className="col-9 my-1">
                    <label htmlFor="answer5">Answer</label>
                    <input value={props.answers[4].value} onChange={(e) => props.handleChange(e.target)} type="text" className="form-control" id="4" />
                    </div>
                    

                    <div className="form-check align-middle">
                    <input checked={props.answers[4].correctAnswer} onChange={(e) => props.handleChange(e.target)} className="form-check-input" type="radio" id="4" value="true" />
                    <label className="form-check-label">Correct Answer</label>
                    </div>
                    
                </div>

                <div className="form-group">
                    <button type="submit" onClick={(e) => createSubmit(e.nativeEvent)} className="btn btn-primary">Create</button>
                </div>
            </form>
   
        </>
    );
}


const QuestionCreate = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const { id } = useParams() as IRouteId;
    const [question, setQuestion] = useState(new Question())
    const [answers, setAnswer] = useState([] as Answer[])
    const [quiz, setQuiz] = useState({} as Quiz)
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = await BaseService.get<Quiz>('Quiz/' + id, appState.token!);
        if (result.ok && result.data) {
            setQuiz(result.data);
        } else {

        }
    }


    useEffect(() => {
        loadData();
        let answers = [];
        for(let i = 0; i < 5; i++){
            let answer = new Answer()
            answers?.push(answer);
        };
        setAnswer(answers);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
        switch (target.id) {
            case 'question':
                setQuestion({...question, value: target.value });
                return;
        }

        if(target.value === "true"){
            setAnswer(
                answers.map((item, index) => 
                    index == parseInt(target.id)
                    ? {...item, correctAnswer : true} 
                    : item 
            ))
        }else{
            setAnswer(
                answers.map((item, index) => 
                    index == parseInt(target.id)
                    ? {...item, value : target.value} 
                    : item 
            ))
        }
    }

    return (
        <>
            <h1>Create</h1>
            <h4>Question</h4>
            <hr />
            <div className="row">
                <div className="col-lg-8">
                    {answers.length === 5? <FormView quiz={quiz} question={question} answers={answers} handleChange={handleChange} /> : null}
                    
                </div>
            </div>
        </>
    )

}

export default QuestionCreate;