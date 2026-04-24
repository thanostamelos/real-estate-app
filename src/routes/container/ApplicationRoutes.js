import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../../view/Home/containers/Home";
import Calendar from "../../view/Calendar/containers/Calendar";
import Reservations from "../../view/Reservations/containers/Reservations";
import Auth from "../../view/Auth/containers/Auth";
import Admin from "../../view/Admin/containers/Admin";
import AdminUserRoles from "../../view/AdminUserRoles/containers/AdminUserRoles";
import Screen from "../../view/Screen/containers/Screen";
import Movie from "../../view/Movie/containers/Movie";
import CheckIn from "../../view/CheckIn/containers/CheckIn";
import AdminReservations from "../../view/AdminReservations/containers/AdminReservations";
import EntryLog from "../../view/EntryLog/containers/EntryLog";

const ApplicationRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>

            <Route
                path="/reservation"
                element={<Reservations/>}
            />

            <Route
                path="/checkIn"
                element={<CheckIn/>}
            />

            <Route
                path="/login"
                element={<Auth mode="login"/>}
            />
            <Route
                path="/signup"
                element={<Auth mode="signup"/>}
            />

            <Route
                path="/calendar"
                element={<Calendar/>}
            />

            <Route
                path="/admin"
                element={<Admin/>}
            >
                <Route index element={<Navigate to="/admin/reservations" replace/>}/>
                <Route path="reservations" element={<AdminReservations/>}/>
                <Route path="entryLog" element={<EntryLog/>}/>
                <Route path="movie" element={<Movie/>}/>
                <Route path="screen" element={<Screen/>}/>
                <Route
                    path="users"
                    element={<AdminUserRoles/>}
                />
            </Route>

            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    )
}

export default ApplicationRoutes;