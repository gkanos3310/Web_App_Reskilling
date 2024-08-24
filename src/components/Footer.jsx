import Popup from 'reactjs-popup';

import data from '../data.json';
import fbIcon from '../assets/icons/fb.png';
import linkedinIcon from '../assets/icons/linkedin.png';
import youtubeIcon from '../assets/icons/youtube.png';
import instaIcon from '../assets/icons/insta.png';
import ModalPost from './ModalPost';

const icons = [fbIcon, linkedinIcon, youtubeIcon, instaIcon];

export default function Footer() {
    let elemID = 1;

    return (
        <footer className="mx-20 border-t border-stone-300">
            <div className='grid grid-rows-1 grid-cols-2 mt-10'>
                <div className='font-semibold text-2xl'>
                    <div className="mt-10">{data.SITE_NAME}</div>
                    <div className='mt-20 flex space-x-6 opacity-50'>
                        {icons.map(icon => 
                            <a key={"icon" + elemID++} href='https://www2.deloitte.com/gr/en.html'><img src={icon} width="35" height="30"></img></a>
                        )}
                    </div>
                </div>
                <ul className='grid grid-rows-5 grid-cols-3 justify-self-stretch'>
                    {data.FOOTER_TABLE.map(elem => elem.label === 'Topic' ?
                        <li key={elem.label + elemID++}><p className={'mb-6 font-semibold text-2xl'}>{elem.label}</p></li>
                        :
                        <li key={elem.label + elemID++}>
                            <Popup trigger = {<button><p className={'mb-6 text-xl hover:underline'}>{elem.label}</p></button>}>
                                {(close) => (
                                    <div className='border-solid border-4 border-black rounded-lg absolute bottom-96 right-80'>
                                        <ModalPost/>
                                        <button onClick={() => close()}>x</button>
                                    </div>
                                )}
                            </Popup>
                        </li>
                    )}
                </ul>
            </div>
        </footer>
    );
}