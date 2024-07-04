import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faRankingStar, faHeartCircleCheck, faUserGroup } from '@fortawesome/free-solid-svg-icons';

interface TabProps {
    tab: string;
    setTab: (status: string) => void;
}

const NavBar: React.FC<TabProps> = ({ tab, setTab }) => {
    return (
        <div className="flex flex-row justify-between absolute md:w-[40%] w-full h-[60px] bottom-0 bg-black-100 items-center px-4 pb-4">
            <div onClick={() => setTab("Play")} className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${tab === "Play" ? "animate-bounce" : "text-white"}`}>
                <FontAwesomeIcon icon={faGamepad} className="text-[#2ea6d9] h-[30px]" />
            </div>
            <div onClick={() => setTab("Task")} className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${tab === "Task" ? "animate-bounce" : "text-white"}`}>
                <FontAwesomeIcon icon={faHeartCircleCheck} className="text-[#2ea6d9] h-[30px]" />
            </div>
            <div onClick={() => setTab("Friend")} className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${tab === "Friend" ? "animate-bounce" : "text-white"}`}>
                <FontAwesomeIcon icon={faUserGroup} className="text-[#2ea6d9] h-[30px]" />
            </div>
            <div onClick={() => setTab("Rank")} className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${tab === "Rank" ? "animate-bounce" : "text-white"}`}>
                <FontAwesomeIcon icon={faRankingStar} className="text-[#2ea6d9] h-[30px]" />
            </div>
        </div>
    )
}

export default NavBar;