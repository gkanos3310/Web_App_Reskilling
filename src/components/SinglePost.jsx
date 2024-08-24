import {useLocation} from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function SinglePost() {
    const location = useLocation();

    return (
        <div>
            <Header isDisabled={true}/>
            <div className='mx-20 mt-40 mb-32 grid grid-cols-2'>
                <div className='place-self-start'>
                    <h1 className="font-bold text-7xl mb-10">Single Post</h1>
                    <h2 className="text-4xl mb-10 text-stone-400">{location.state.title}</h2>
                    <h2 className='font-medium text-2xl'>{location.state.body}</h2>
                </div>
                <div className='place-self-end'>
                    <img src={location.state.url} className='rounded-xl'></img>
                </div>
            </div>
            <Footer/>
        </div>
    );
}