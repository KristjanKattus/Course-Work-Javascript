import { isEmptyObject } from "jquery";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { Category } from "../../dto/Category";
import { Quiz } from "../../dto/Quiz";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IRouteId } from "../../types/IRouteId";

const RowDisplay = (props: {category:Category, quiz: Quiz, role:string }) => {
    return (
    <>
        <td>{props.quiz.value}</td>
        <td>{props.quiz.questions?.length}</td>
        <td>{props.quiz.timesAttempted}</td>
        <td>{props.quiz.cleared}</td>
        <td>{(props.quiz.timesAttempted !== 0 && props.quiz.cleared !== 0)? (props.quiz.timesAttempted! / props.quiz.cleared! * 100) : 0} %</td>
        <td><Link className="btn btn-primary" to={'/Quiz/' + props.quiz.id}>Take the quiz!</Link></td>
        {props.role ==="Admin"? <td><Link className="btn btn-primary" to={'/Question/Create/' + props.quiz.id}>Add question!</Link></td>: null}
       
    </>);
} 

const CategoryDetails = () => {
    const { id } = useParams() as IRouteId;
    const [category, setCategory] = useState({} as Category);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = await BaseService.get<Category>('/Category/' + id, appState.token!);
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setCategory(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    if(!isEmptyObject(category)){
        return (
            <>
                <div className="d-sm-flex align-items-center justify-content-center">
                    <div className="card shadow mb-4" >
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Categories</h6>
                        </div>
                        <div className="card-body">
                            <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info">
                                            <thead className="text-center">
                                            <tr role="row">
                                            <th>Quiz name</th>
                                            <th>Number of questions</th>
                                            <th>Times attempted</th>
                                            <th>Time cleared</th>
                                            <th>Percentage (+50%)</th>
                                            <th></th>
                                            </tr>
                                            </thead>
                                            <tbody className="text-center ">
                                            {category.quizzes!.map(quiz =>
                                                    <tr key={quiz.id.toString()}>
                                                        <RowDisplay category={category} quiz={quiz} role={appState.role}/>
                                                    </tr>)}
                                                {/* {appState.role === 'Admin' ? <Link className="btn btn-danger" to={'/Question/' + category.id}>Add quiz</Link>: null} */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
        )
    }else{
        return (
            <> 
                <Loader {...pageStatus} />
            </>
        );
    }
}
export default CategoryDetails;