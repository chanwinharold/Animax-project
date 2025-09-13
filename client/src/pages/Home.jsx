import React from 'react';
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className={"text-dark-neutral-100 dark:text-light-neutral-100"}>
            <div>Home Page</div>
            <Link to={"/login"}>Go to login</Link>
        </div>
    );
}

export default Home;