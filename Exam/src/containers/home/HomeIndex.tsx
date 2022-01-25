import { isEmptyObject } from "jquery";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link} from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { Category } from "../../dto/Category";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";

const RowDisplay = (props: { category: Category }) => {
    return (
    <>
        <td>{props.category.value}</td>
        <td>{props.category.quizCount}</td>
        <td>{props.category.totalQuizAttempts}</td>
        <td>{props.category.quizzesCleared}</td>
        <td>{(props.category.totalQuizAttempts !== 0 && props.category.quizzesCleared !== 0)? (props.category.quizzesCleared! / props.category.totalQuizAttempts! * 100) : 0} %</td>
        <td>
            <Link className="btn btn-info" to={'/Category/' + props.category.id}>Go to category</Link>
        </td>
    </>);
} 

const HomeIndex = () => {
    const [categories, setCategories] = useState([] as Category[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = await BaseService.getAll<Category>('Category', appState.token!);
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setCategories(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if(!isEmptyObject(categories)){
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
                                            <th>Name</th>
                                            <th>Quiz count</th>
                                            <th>Total quiz attempts</th>
                                            <th>Quizzed cleared</th>
                                            <th>Percentage (+50%)</th>
                                        </tr>
                                        </thead>
                                        <tbody className="text-center ">
                                            {categories.map(category =>
                                                <tr key={category.id.toString()}>
                                                    <RowDisplay category={category} />
                                                </tr>)
                                            }
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
export default HomeIndex;
