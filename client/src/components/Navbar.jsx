import React, {useState} from 'react';

import fullLogoUrl from "/logo-full.svg"
import smallLogoUrl from "/logo-small.svg"
import profileUrl from "/user-pictures/1758621780782-user-picture.jpg";

import menuHamburgerUrl from "../assets/icons/icon-menu-hamburger.svg"
import menuCloseUrl from "../assets/icons/icon-menu-close.svg"
import linkedInUrl from "../assets/icons/icon-linkedin.svg"
import githubUrl from "../assets/icons/icon-github.svg"
import searchUrl from "../assets/icons/icon-search.svg"

import {Link} from "react-router-dom";

function Navbar() {
    const [showNav, setShowNav] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <header className={"max-w-screen overflow-x-hidden w-full flex justify-between items-center max-sm:gap-4 gap-8 max-sm:px-4 px-8 py-4 background-90deg"}>
            <span>
                <picture>
                    <source srcSet={fullLogoUrl} width={"100"} media={"(min-width: 500px)"}/>
                    <img src={smallLogoUrl} alt="Animax logo" width={"30"}/>
                </picture>
            </span>

            <nav className={`max-laptop:fixed max-laptop:z-20 ${showNav ? 'nav-mobile' : 'nav-mobile-hidden'}`}>

                <div className={"min-laptop:hidden flex justify-between"}>
                    <span><img src={fullLogoUrl} alt="Animax logo" width={"100"}/></span>
                    <span onClick={() => setShowNav(false)}><img src={`${menuCloseUrl}`} alt="menu close"/></span>
                </div>

                <ul className={"flex max-laptop:flex-col gap-x-8 uppercase justify-between items-center font-semibold"}>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/recommandation"}>Recommandations</Link></li>
                    <li><Link to={"/trending"}>Trending</Link></li>
                </ul>

                <div className={"min-laptop:hidden flex self-center gap-x-4"}>
                    <span><img width={50} src={`${linkedInUrl}`} alt="social media LinkedIn"/></span>
                    <span><img width={50} src={`${githubUrl}`} alt="social media Github"/></span>
                </div>
            </nav>

            <span className={"flex-1 w-full max-w-lg"}>
                <label className={"relative"}>
                    <input
                        type="search"
                        id="searchbar"
                        placeholder={"SEARCH"}
                        value={searchValue}
                        onChange={handleSearchChange}
                        className={"search-bar w-full h-8 bg-primary-search rounded-full"}
                    />
                    { searchValue.length===0 ? <span className={"absolute right-4"}><img src={`${searchUrl}`} alt="icone de recherche"/></span> : null }
                </label>
            </span>

            <div className={"flex gap-x-4 items-center"}>
                <span className={""}>
                    <img
                        src={profileUrl}
                        alt="profile picture"
                        width={"50"}
                        className={"rounded-full"}
                    />
                </span>

                <span className={"min-laptop:hidden"} onClick={() => setShowNav(true)}>
                <img src={`${menuHamburgerUrl}`} alt="menu hamburger"/>
            </span>
            </div>
        </header>
    );
}

export default Navbar;