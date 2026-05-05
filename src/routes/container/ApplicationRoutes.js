import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../../view/Home/containers/Home";

const ApplicationRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login"/>
            <Route path="/signup"/>

            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    )
}

export default ApplicationRoutes;