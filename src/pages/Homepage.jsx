import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PostList from "../components/MainPostsTemplate";

export default function Homepage() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className={isLoading ? 'opacity-25' : ''}>
            <Header setIsLoading={setIsLoading}/>
            <PostList/>
            <Footer setIsLoading={setIsLoading}/>
        </div>
    );
}