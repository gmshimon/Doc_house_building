import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";

const Main = () => {
    return (
        <div className="w-full">
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Main;