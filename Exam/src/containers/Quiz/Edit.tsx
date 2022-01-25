import { EEXIST } from "constants";
import { isEmptyObject } from "jquery";
import { parse } from "path";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { Answer } from "../../dto/Answer"
import { Question } from "../../dto/Question";
import { Quiz } from "../../dto/Quiz";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IFormProps } from "../../types/IFormProps";
import { IRouteId } from "../../types/IRouteId";

interface IFormValues {
    quizId: string;
    questionText: string,
    answer1: string;
    submit: string;
    answer3: string;
    answer4: string;
    answer5: string;
    checkedAnswer: string
    poll:string
}

const initialFormValues: IFormValues = {
    quizId: "",
    questionText: "",
    answer1: "",
    submit: "",
    answer3: "",
    answer4: "",
    answer5: "",
    checkedAnswer: "",
    poll:""
}


const RowDisplay = (props: { answer: Answer, index: number, quesitonIndex:number, question: Question, handleChange: Function}) => {
    return (
    <>
        <td>
            { props.answer.value}
        </td>
        <td>
            <input checked={props.question.checkedAnswerId === props.answer.id} onChange={(e) => props.handleChange(e.target)} className="form-check-input" type="radio" id={""+props.question.id} value={props.answer.id}/>
            <label className="form-check-label">Correct Answer</label>
        </td>
    </>);
} 

const QuizEdit = () => {
    const { id } = useParams() as IRouteId;
    const [quiz, setQuiz] = useState({} as Quiz);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);
    const [questions, setQuestion] = useState([] as Question[]);
    const [submit, setSubmit] = useState(Boolean);
    const [formValues, setFormValues] = useState(initialFormValues);


    const loadData = async () => {
        let result = await BaseService.get<Quiz>('/Quiz/' + id, appState.token!);
        let questionResult = await BaseService.get<Question[]>('/Question/' + id);
        if (result.ok && result.data && questionResult.ok && questionResult.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setQuiz(result.data);
            setQuestion(questionResult.data)
            
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    const createSubmit = async (e: Event) => {
        e.preventDefault();
        setQuiz({...quiz, questions: questions});

        let response = await BaseService.put("Quiz/" + quiz.id, questions, appState.token!);

        setSubmit(true);
    }
    

    const handleChange = (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
        setQuestion(
            questions.map(item => 
                item.id === target.id
                ? {...item, checkedAnswerId : (target as HTMLInputElement).value} 
                : item 
        ))
    }

    
    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    if(!isEmptyObject(quiz)){
        return (
            <>
                <div className="row">
                    <div className="col-lg-8">
                        <form asp-action="Edit">
                            {questions!.map((question, quesitonIndex) => 
                                <table className="table">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>{question.value}</th>
                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {question.answers!.map((answer, index) =>
                                                    <tr className={submit===true && answer.correctAnswer? "bg-success":
                                                     submit===true && !answer.correctAnswer && question.checkedAnswerId === answer.id? "bg-danger"
                                                     : ""}
                                                    
                                                     key={answer.id.toString()}>
                                                        <RowDisplay answer={answer} index={index} quesitonIndex={quesitonIndex} question={question} handleChange={handleChange}/>
                                                    </tr>)
                                                }
                                    </tbody>
                                </table>
                                )         
                            }
                            {!submit===true?
                                <div className="form-group">
                                    <button type="submit" onClick={(e) => createSubmit(e.nativeEvent)} className="btn btn-primary">Create</button>
                                </div>:  <Link className="btn btn-secondary" to={'/Category/' + quiz.categoryId!}>Back to list</Link>
                            }
                        </form>
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
export default QuizEdit;