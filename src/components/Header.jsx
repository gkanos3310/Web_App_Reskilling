import { useNavigate } from 'react-router-dom';
import data from '../data.json';

const buttons = data.BUTTONS;

export default function Header({setIsLoading, isDisabled}) {
    const disableStyle = isDisabled ? ' opacity-30 text-stone-800' : ' text-black';
    const stylePage = 'inline mr-10 bg-white rounded-lg py-4 px-7 hover:bg-black hover:text-white' + disableStyle;
    const styleButton = 'inline mr-10 bg-black text-white rounded-lg py-4 px-7 hover:bg-stone-700 transition-colors';

    let btnID = 1;
    let navigate = useNavigate();

    async function navigateHome() {
        navigate('/');
    }

    async function navigateToSinglePost(event) {
        setIsLoading(true);
        const article = await (await fetch('http://localhost:3000/posts', {headers : {'from' : event.target.id}})).json();
        setIsLoading(false);

        const route = !Object.keys(article).includes('errMsg') ? 'posts/:' + article.id : 'errorPage';
        const state = !Object.keys(article).includes('errMsg') ? article : null;
        
        navigate(route, {state : state});
    }

    return (
        <header className="font-semibold mx-20 mt-10 text-2xl">
            <div className="inline">{data.SITE_NAME}</div>
            <ul className="absolute top-0 right-0 mr-10 mt-10">
                {buttons.map(btn => 
                    <li key={btnID++} className={btn.label === 'Page' ? stylePage : styleButton}>
                        <button onClick={btn.label === 'Page'  ? navigateToSinglePost : navigateHome} disabled={isDisabled && btn.label != 'Button'}><p className={isDisabled && btn.label != 'Button' ? 'line-through' : ''} id={btnID}>{btn.label}</p></button>
                    </li>
                )}
            </ul>
        </header>
    );
}