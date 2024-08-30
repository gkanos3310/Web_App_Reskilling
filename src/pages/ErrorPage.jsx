import Header from "../components/Header";
import {useLocation} from 'react-router-dom';

export default function ErrorPage() {
    const location = useLocation();

    return (
        <div>
            <Header isDisabled={true}/>
            <h1 className="text-center font-bold text-lg mt-12 xl:text-4xl xl:mt-24 text-red-600 underline">{location.state}</h1>
        </div>
    );
}