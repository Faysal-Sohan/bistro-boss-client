import { FaBook, FaHome, FaList, FaUsers, FaUtensilSpoon } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
    return (
        <>
            <li>
                <NavLink to="/dashboard/adminHome">
                    <FaHome></FaHome>
                    Admin Home</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/addItems">
                    <FaUtensilSpoon></FaUtensilSpoon>
                    Add Items</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manageItems">
                    <FaList></FaList>
                    Manage Items</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manageBookings">
                    <FaBook></FaBook>
                    Manage Bookings</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/users">
                    <FaUsers></FaUsers>
                    All Users</NavLink>
            </li>
        </>
    );
};

export default AdminNav;