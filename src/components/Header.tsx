import React from "react";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-1 flex w-full">
            <div className="flex flex-grow items-center justify-between px-3">
                <NavLink to="/">
                    {/* <img src="/logo.png" className='h-[60px] rounded-full' alt="Logo" /> */}
                </NavLink>
            </div>
        </header>
    )
}

export default Header;