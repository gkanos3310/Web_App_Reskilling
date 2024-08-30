import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import { useEffect, useState } from "react";
import Footer from '../components/Footer';
import Header from '../components/Header';
import { isValidURL } from '../controllers/util-functions';
import data from '../assets/metadata/data.json'; 

export default function SinglePost() {
    const location = useLocation();
    const [[title, body, url], setPostData] = useState([]);
    const defaultRouting = (location.state != null);
    const manualRouting = (location.state === null);
    const queryToken = (window.location.href.split(':')[window.location.href.split(':').length - 1]);

    let navigate = useNavigate();

    useEffect(() => {
        async function getTargetedPost(targetID) {
            const article = await (await fetch(data.SERVER_PORT + '/posts/:' + targetID, {headers : {'from' : targetID}})).json();
            setPostData([article.title, article.body, article.url]);
        }

        //Normal routing via buttons and code redirections.
        if(defaultRouting) {
            setPostData([location.state.title, location.state.body, location.state.url]);
        }
        //The user manually changed the URL and tries to redirect to a targeted post.
        else if(manualRouting && isValidURL(window.location.href)) {
            getTargetedPost(queryToken);
        }
        else {
            navigate('../ErrorPage', {state : 'Error: You requested a post that does not exist...'});
        }
    }, [navigate, location.state, defaultRouting, manualRouting, queryToken]);

    return (
        <div>
            <Header isDisabled={true}/>
            <div className={data.GENERAL_SIDE_MARGIN_PER_SCREEN + 'text-center md:text-start mt-8 md:mt-24 xl:mt-40 xl:mb-32 md:grid md:grid-cols-2 md:gap-x-2'}>
                <div className='md:place-self-start'>
                    <h1 className="font-bold mb-4 xl:mb-10 text-xl md:text-4xl xl:text-7xl">Single Post</h1>
                    <h2 className="text-lg mb-4 xl:mb-10 md:text-xl xl:text-4xl text-stone-400">{title}</h2>
                    <h2 className='border-b border-stone-500 md:border-b-0 h-40 md:h-full overflow-scroll md:overflow-hidden font-medium mb-4 text-sm md:text-lg xl:text-2xl'>{body}</h2>
                </div>
                <div className='mb-16 mt-8 md:place-self-end flex justify-center rounded-xl'>
                    <img src={url} className='object-contain w-full md:w-auto h-80 md:h-auto rounded-lg'></img>
                </div>
            </div>
            <Footer/>
        </div>
    );
}