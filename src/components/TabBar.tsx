import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faRankingStar, faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';

interface TabProps {
    tab: string;
    setTab: (status: string) => void;
}

const NavBar: React.FC<TabProps> = ({ tab, setTab }) => {
    return (
        <div className="flex flex-row justify-between absolute md:w-[40%] w-full h-[60px] bottom-0 bg-black-100 items-center px-4 pb-4">
            <div onClick={() => setTab("Play")} className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${tab === "Play" ? "scale-[110%]" : "text-white"}`}>
                {/* <img src="/play.png" alt="play" className="md:w-12 md:h-12 w-10 h-10 p-[1px] rounded-lg" /> */}
                <FontAwesomeIcon icon={faGamepad} className="text-[#2ea6d9] h-[30px]" />
            </div>
            <div onClick={() => setTab("Task")} className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${tab === "Task" ? "scale-[110%]" : "text-white"}`}>
                {/* <img src="/tasks.png" alt="quest" className="md:w-12 md:h-12 w-10 h-10 p-[1px] rounded-lg" /> */}
                <FontAwesomeIcon icon={faHeartCircleCheck} className="text-[#2ea6d9] h-[30px]" />
            </div>
            <div onClick={() => setTab("Rank")} className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${tab === "Rank" ? "scale-[110%]" : "text-white"}`}>
                {/* <img src="/ranks.png" alt="ranking" className="md:w-12 md:h-12 w-10 h-10 p-[1px] rounded-lg" /> */}
                <FontAwesomeIcon icon={faRankingStar} className="text-[#2ea6d9] h-[30px]" />
            </div>
        </div>
    )
}

export default NavBar;