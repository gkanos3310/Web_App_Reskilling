import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import PostList from "./PostList";

export default function Homepage() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            <div className={isLoading ? 'opacity-25' : ''}>
                <Header setIsLoading={setIsLoading}/>
                <PostList/>
                <Footer setIsLoading={setIsLoading}/>
            </div>
        </div>
    );
}