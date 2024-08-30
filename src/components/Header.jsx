import { useNavigate } from 'react-router-dom';
import data from '../assets/metadata/data.json';

const buttons = data.BUTTONS;

export default function Header({setIsLoading, isDisabled}) {
    const disableStyle = isDisabled ? ' opacity-30 text-stone-800' : ' text-black';
    const sharedStyleButtons = 'inline mr-1 py-0.5 px-1 md:mr-6 md:py-2 md:px-3 xl:mr-12 xl:py-3 xl:px-5 rounded-lg text-sm xl:text-2xl font-sans leading-6 duration-500 ';

    const stylePage = sharedStyleButtons + 'bg-white hover:bg-black hover:text-white font-medium' + disableStyle;
    const styleButton = sharedStyleButtons + 'bg-black text-white hover:bg-stone-700 transition-colors';

    let btnID = 1;
    let navigate = useNavigate();

    async function navigateHome() {
        navigate('/');
    }

    async function navigateToSinglePost(event) {
        try {
            setIsLoading(true);
            //GET request to the node server. Returns a random single post.
            const article = await (await fetch(data.SERVER_PORT + '/posts', {headers : {'from' : event.target.id}})).json();
            setIsLoading(false);

            //Routing to the SinglePost page or to the Error one if an error in the server occured.
            const route = !Object.keys(article).includes('errMsg') ? 'posts/:' + article.id : 'ErrorPage';
            const state = !Object.keys(article).includes('errMsg') ? article : null;
            
            navigate(route, {state : state});
        }
        catch(e) {
            console.log(e);
            setIsLoading(false);
            navigate('ErrorPage', {state : 'Internal Server Error...'});
        }
    }

    return (
        <header className={data.GENERAL_SIDE_MARGIN_PER_SCREEN + "mt-4 md:mt-8 lg:mt-12 xl:mt-16 mx-8 md:mx-20 xl:mx-32"}>
            <div className="inline font-sans font-medium leading-[30px] text-sm xl:text-2xl">
                <button onClick={navigateHome} className='hover:underline'>
                    <p title='Home'>{data.SITE_NAME}</p>
                </button>
            </div>
            <ul className="absolute top-0 right-0 mt-[18px] mr-8 md:mr-14 xl:mr-20 md:mt-8 xl:mt-16">
                {buttons.map(btn => 
                    <li key={btnID++} className={btn.label === 'Page' ? stylePage : styleButton}>
                        <button onClick={btn.label === 'Page'  ? navigateToSinglePost : navigateHome} disabled={isDisabled && btn.label != 'Button'}>
                            <p className={isDisabled && btn.label != 'Button' ? 'line-through' : ''} id={btnID} title={btn.tooltip}>{btn.label}</p>
                        </button>
                    </li>
                )}
            </ul>
        </header>
    );
}