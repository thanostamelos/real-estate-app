import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import MainLayout from "./layout/MainLayout";
import ApplicationRoutes from "./routes/container/ApplicationRoutes";
import {useSelector} from "react-redux";
import {selectSnackbarDataInfo} from "./utils/snackbar/selectors/SnackbarSelectors";
import SimpleSnackbar from "./utils/snackbar/SimpleSnackbar";

function App() {
    const snackbarInfo = useSelector(selectSnackbarDataInfo);

    return (
        <Router>
            <MainLayout>
                <ApplicationRoutes/>
                {snackbarInfo?.open && <SimpleSnackbar {...snackbarInfo}/>}
            </MainLayout>
        </Router>
    )
}

export default App;