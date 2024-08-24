import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import data from '../data.json';
import { buildCombo, textMultiplier } from '../controllers/util-functions';

const postsAPI = data.POSTS_ENDPOINT;
const photosAPI = data.PHOTOS_ENDPOINT;

export default function PostList() {
    const [[articles, headArticles, realtedArticles], setArticles] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    let counterIndex = 1;
    let navigate = useNavigate();

    async function navigateToSinglePost(event) {
        const postIndex = event.target.id.split(':')[1] - 1;
        navigate('posts/:' + articles[postIndex].id, {state : articles[postIndex]});
    }

    useEffect(() => {
        async function fetchPosts() {
            try {
                const rand = parseInt(Math.random() * 88);
                console.log('rand ' + rand);

                const payload = await Promise.all([axios.get(postsAPI), axios.get(photosAPI)]);
                const filteredPosts = payload[0].data.filter(elem => (elem.id >= rand && elem.id <= rand + data.POSTS_NUM));
                const filteredPhotos = payload[1].data.filter(elem => (elem.id >= rand && elem.id <= rand + data.POSTS_NUM));
                
                let tmpArticles = buildCombo(filteredPosts, filteredPhotos, data.POSTS_NUM);
                textMultiplier(tmpArticles, 5);

                setArticles([tmpArticles ,tmpArticles.slice(0,3), tmpArticles.slice(3)]);
                setIsFetching(false);
            }
            catch(e) {
                console.log(e);
                navigate('errorPage', {state : null});
            }
        }
        
        fetchPosts();
    }, [navigate]);

    return(
        <div>
            {!isFetching && 
                <div className="mx-20 mt-40">
                    <h1 className="font-bold text-7xl mb-12">{data.POSTS_LIST}</h1>
                    <h2 className="text-4xl mb-20 text-stone-400">{headArticles[0].title}</h2>
                    <div className="flex justify-center items-center">
                        <button className="hover:opacity-80" onClick={navigateToSinglePost}>
                            <img id={'Head Post:' + counterIndex++} src={headArticles[0].url} className="rounded-xl w-screen h-[52rem] cursor-pointer" title={'Post ' + headArticles[0].id}></img>
                        </button>
                    </div>
                    <div className="font-medium text-left text-2xl mx-[25rem] my-28 w-[60rem]">{headArticles[0].body}</div>
                    <div className="justify-items-center grid grid-rows-1 grid-cols-2 gap-x-4">
                        <button className="hover:opacity-80" onClick={navigateToSinglePost}>
                            <img id={'Head Post:' + counterIndex++} src={headArticles[1].url} className="rounded-xl w-screen h-[40rem] cursor-pointer" title={'Post ' + headArticles[1].id}></img>
                        </button>
                        <button className="hover:opacity-80" onClick={navigateToSinglePost}>
                            <img id={'Head Post:' + counterIndex++} src={headArticles[2].url} className="rounded-xl w-screen h-[40rem] cursor-pointer" title={'Post ' + headArticles[2].id}></img>
                        </button>    
                    </div>
                    <div className="font-medium text-left text-2xl mx-[25rem] my-28 w-[60rem]">{headArticles[1].body}</div>
                    <div className="font-medium text-left text-2xl mx-[25rem] my-28 w-[60rem]">{headArticles[2].body}</div>
                </div>
            }
            {!isFetching &&
                <div className="mx-20 mt-20">
                    <h1 className="font-bold text-4xl mb-10">{data.RELATED_ARTICLES}</h1>
                    <ul className="grid grid-rows-3 grid-cols-3 gap-x-20">
                        {realtedArticles.map(article =>
                            <li key={article.id}>
                                <button className="hover:opacity-80" onClick={navigateToSinglePost}>
                                    <img id={'Related Post:' + counterIndex++} src={article.thumbnail} className="h-[28rem] cursor-pointer rounded-xl" title={'Post ' + article.id}></img>
                                </button>
                                <div className="font-semibold text-2xl mt-2 mb-32">
                                    <div>{article.title}</div>
                                    <div className="text-stone-500">Author: User {article.id}</div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            }
        </div>
    );
}