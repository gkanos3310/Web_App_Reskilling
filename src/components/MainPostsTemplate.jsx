import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import data from '../assets/metadata/data.json';
import { buildCombo, textMultiplier } from '../controllers/util-functions';
import RelatedList from './RelatedList';
import HeadPost from './HeadPost';

const postsAPI = data.POSTS_ENDPOINT;
const photosAPI = data.PHOTOS_ENDPOINT;

export default function PostList() {
    const [[articles, headArticles, realtedArticles], setArticles] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        async function fetchPosts() {
            try {
                const rand = parseInt(Math.random() * 88);

                const payload = await Promise.all([axios.get(postsAPI), axios.get(photosAPI)]); //Fetching directly from the frontend.
                const filteredPosts = payload[0].data.filter(elem => (elem.id >= rand && elem.id <= rand + data.POSTS_NUM));
                const filteredPhotos = payload[1].data.filter(elem => (elem.id >= rand && elem.id <= rand + data.POSTS_NUM));
                
                //combining the 2 api payloads to a single one.
                let tmpArticles = buildCombo(filteredPosts, filteredPhotos, data.POSTS_NUM);
                textMultiplier(tmpArticles, 5);

                setArticles([tmpArticles ,tmpArticles.slice(0,3), tmpArticles.slice(3)]);
                setIsFetching(false);
            }
            catch(e) {
                console.log(e + ' ' + articles);
                navigate('ErrorPage', {state : 'Internal Server Error...'});
            }
        }
        
        fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    return(
        <div className={data.GENERAL_SIDE_MARGIN_PER_SCREEN}>
            {!isFetching && <HeadPost headArticles={headArticles}/>}
            {!isFetching && <RelatedList realtedArticles={realtedArticles}/>}
        </div>
    );
}