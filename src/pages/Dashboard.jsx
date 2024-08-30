import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Dashboard() {
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
}