import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../../view/Home/containers/Home";
import Auth from "../../view/Auth/containers/Auth";

const ApplicationRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>


            <Route
                path="/login"
                element={<Auth mode="login"/>}
            />
            <Route
                path="/signup"
                element={<Auth mode="signup"/>}
            />


            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    )
}

export default ApplicationRoutes;