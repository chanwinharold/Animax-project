import React from 'react';
import {Link} from "react-router-dom";

function Home() {
    return (
        <>
            <div>Home Page</div>
            <Link to={"/login"}>Go to login</Link>
        </>
    );
}

export default Home;