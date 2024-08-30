import Popup from 'reactjs-popup';

import data from '../assets/metadata/data.json';
import fbIcon from '../assets/icons/fb.png';
import linkedinIcon from '../assets/icons/linkedin.png';
import youtubeIcon from '../assets/icons/youtube.png';
import instaIcon from '../assets/icons/insta.png';
import ModalPost from './ModalPost';

const icons = [fbIcon, linkedinIcon, youtubeIcon, instaIcon];

export default function Footer() {
    let elemID = 1;

    return (
        <footer className={data.GENERAL_SIDE_MARGIN_PER_SCREEN + "border-t border-stone-300 mt-14 md:mt-24"}>
            <div className='grid grid-rows-1 grid-cols-2 md:mt-10 mb-2 md:mb-4 lg:mb-8 xl:mb-12'>
                <div>
                    <div className="font-normal md:leading-9 text-sm xl:text-2xl mt-2">{data.SITE_NAME}</div>
                    <div className='flex space-x-2 xl:space-x-6 opacity-50 mt-14 md:mt-20 xl:mt-28'>
                        {icons.map(icon => 
                            <a key={"icon" + elemID++} href='https://www2.deloitte.com/gr/en.html'><img src={icon} className="w-4 h-4 md:w-6 md:h-6 xl:w-8 xl:h-8"></img></a>
                        )}
                    </div>
                </div>
                <ul className='grid grid-rows-4 grid-cols-3 justify-self-stretch mt-2'>
                    {data.FOOTER_TABLE.map(elem => elem.label === 'Topic' ?
                        <li key={elem.label + elemID++}><p className={'font-semibold text-sm xl:text-xl xl:mb-6 md:leading-6'}>{elem.label}</p></li>
                        :
                        <li key={elem.label + elemID++}>
                            <Popup trigger = {<button><p className={'font-medium text-sm text-[#454545] mb-0.5 md:mb-4 lg:mb-5 xl:mb-6 xl:text-lg md:leading-6 hover:underline'}>{elem.label}</p></button>}>
                                {(close) => (
                                    <div className='border-solid border-4 border-black rounded-lg absolute bottom-60 right-80'>
                                        <ModalPost/>
                                        <button onClick={() => close()}></button>
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