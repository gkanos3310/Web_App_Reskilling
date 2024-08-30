import { useNavigate } from 'react-router-dom';
import data from '../assets/metadata/data.json';

export default function MainPost(props) {
    let counterIndex = 1;
    let navigate = useNavigate();

    //Clicked from the related or head posts and redirects the corresponding post to the dedicated SinglePost view.
    async function navigateToSinglePost(event) {
        const postIndex = event.target.id.split(':')[1] - 1;
        navigate('posts/:' + props.headArticles[postIndex].id, {state : props.headArticles[postIndex]});
    }

    return (
        <div className="mt-10 md:mt-20 xl:mt-40">
            <h1 className="font-bold text-3xl md:text-4xl xl:text-6xl mb-2 md:mb-4 xl:mb-6 xl:leading-[40px]">{data.POSTS_LIST}</h1>
            <h2 className="font-normal text-sm md:text:lg xl:text-2xl mb-4 md:mb-12 xl:mb-20 text-[#828282] md:leading-5 xl:leading-9 xl:w-[46rem]">{props.headArticles[0].title}</h2>
            <div className="flex justify-center items-center">
                <button className="hover:opacity-80 duration-500" onClick={navigateToSinglePost}>
                    <img id={'Head Post:' + counterIndex++} src={props.headArticles[0].url} className="rounded-xl w-screen h-48 md:h-[500px] xl:h-[650px] cursor-pointer" title={'Post ' + props.headArticles[0].id}></img>
                </button>
            </div>
            <div className="border-b border-stone-500 md:border-b-0 font-sans font-medium text-center md:text-left text-sm md:text-lg xl:text-xl mt-4 mb-12 md:my-16 xl:my-20 md:px-36 xl:px-72 h-60 md:h-full overflow-scroll md:overflow-hidden">{props.headArticles[0].body}</div>
            <div className="justify-items-center grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8">
                <button className="hover:opacity-80 duration-500" onClick={navigateToSinglePost}>
                    <img id={'Head Post:' + counterIndex++} src={props.headArticles[1].url} className="rounded-xl w-screen h-44 md:h-[350px] xl:h-[436px] cursor-pointer" title={'Post ' + props.headArticles[1].id}></img>
                </button>
                <button className="hover:opacity-80 duration-500" onClick={navigateToSinglePost}>
                    <img id={'Head Post:' + counterIndex++} src={props.headArticles[2].url} className="rounded-xl w-screen h-44 md:h-[350px] xl:h-[436px] cursor-pointer" title={'Post ' + props.headArticles[2].id}></img>
                </button>    
            </div>
            <div className="border-b border-stone-500 md:border-b-0 font-sans font-medium my-8 md:my-8 xl:my-20 text-center md:text-left text-sm md:text-lg xl:text-xl md:px-36 xl:px-72 h-60 md:h-full overflow-scroll md:overflow-hidden">
                <div className='mb-4 md:mb-8 xl:mb-10'>{props.headArticles[1].body}</div>
                <div className='md:mb-14 xl:mb-18'>{props.headArticles[2].body}</div>
            </div>
        </div>
    );
}