import { useNavigate } from 'react-router-dom';
import data from '../assets/metadata/data.json';

export default function RelatedList(props) {
    let counterIndex = 1;
    let navigate = useNavigate();

    //Clicked from the related or head posts and redirects the corresponding post to the dedicated SinglePost view.
    async function navigateToSinglePost(event) {
        const postIndex = event.target.id.split(':')[1] - 1;
        navigate('posts/:' + props.realtedArticles[postIndex].id, {state : props.realtedArticles[postIndex]});
    }

    return (
        <>
            <h1 className="font-sans font-semibold md:leading-10 text-center md:text-left text-lg md:text-2xl xl:text-4xl">{data.RELATED_ARTICLES}</h1>
            <div className="mt-8 md:mt-10 xl:mt-12 h-[500px] md:h-full overflow-scroll md:overflow-hidden">
                <ul className="grid grid-rows-9 grid-cols-1 md:grid-rows-3 md:grid-cols-3 md:gap-x-8 place-items-center md:place-items-start">
                    {props.realtedArticles.map(article =>
                        <li key={article.id} className='mb-0.5 md:mb-4 text-center md:text-left'>
                            <button className="hover:opacity-80 duration-500" onClick={navigateToSinglePost}>
                                <img id={'Related Post:' + counterIndex++} src={article.thumbnail} className="w-56 h-44 md:w-56 md:h-44 lg:w-80 lg:h-48 xl:w-[600px] xl:h-[450px] cursor-pointer rounded-xl" title={'Post ' + article.id}></img>
                            </button>
                            <div className="font-sans font-medium mt-1 mx-1 text-sm xl:text-xl xl:mb-32 w-56 md:w-40 lg:w-44 xl:w-[500px]">
                                <div>{article.title}</div>
                                <div className="text-[#828282] mt-1">Author: User {article.id}</div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}