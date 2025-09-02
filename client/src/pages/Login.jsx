import React from 'react';
import {Link} from "react-router-dom";


function Login() {

    return (
        <main className={"connexion-wrapper background-connexion"}>
            <div className={"connexion-header"}>
                <Link className={"bg-primary-accent-2"} to={"/login"}><span>login</span></Link>
                <span className={"bar"}></span>
                <Link to={"/signup"}><span>sign up</span></Link>
            </div>
            <form className={"connexion-form"}>
                <label className={"connexion-input"}>
                    <input
                        id={"username"}
                        name={"username"}
                        type={"text"}
                        placeholder={"Enter your username..."}
                    />
                </label>
                <label className={"connexion-input"}>
                    <input
                        id={"password"}
                        name={"password"}
                        type={"password"}
                        placeholder={"Enter your password..."}
                    />
                </label>

                <button className={"connexion-button"} type="submit">Login</button>
            </form>
        </main>
    );
}

export default Login;