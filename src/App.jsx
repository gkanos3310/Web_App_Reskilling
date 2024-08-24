import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import SinglePost from "./components/SinglePost";
import ErrorPage from "./components/ErrorPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/posts" element={<SinglePost />} />
                <Route path={"/posts/:id"} element={<SinglePost />} />
                <Route path={"*"} element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}