import React from 'react';
import ThemeButton from "./ThemeButton.jsx";

import linkedInUrl from "../assets/icons/icon-linkedin.svg";
import githubUrl from "../assets/icons/icon-github.svg";

function Footer() {
    return (
        <footer className={"min-md:grid grid-cols-4 max-md:flex flex-col justify-center max-md:items-center gap-8 max-md:text-center p-12 background-footer"}>
            <div className={"flex flex-wrap justify-center gap-8 items-center gap-y-4"}>
                <ThemeButton />
                <div className={"flex flex-row self-center gap-x-4"}>
                    <span><img width={50} src={`${linkedInUrl}`} alt="social media LinkedIn"/></span>
                    <span><img width={50} src={`${githubUrl}`} alt="social media Github"/></span>
                </div>
            </div>
            <div>
                <strong>Navigation</strong>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>FAQ</li>
                        <li>About Us</li>
                    </ul>
                </nav>
            </div>
            <div>
                <strong>Legal</strong>
                <nav>
                    <ul>
                        <li>Privacy and policy</li>
                        <li>Terms of service</li>
                        <li>Cookie preferences</li>
                    </ul>
                </nav>
            </div>
            <div>
                <strong>Talk of us</strong>
                <nav>
                    <ul>
                        <li>example@mail.com</li>
                        <li>+00 123 456 789</li>
                    </ul>
                </nav>
            </div>

        </footer>
    );
}

export default Footer;