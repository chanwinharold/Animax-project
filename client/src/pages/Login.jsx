import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import ThemeButton from "../components/ThemeButton.jsx";


function Login() {
    const [value, setValue] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const Navigate = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setValue(values => (
            {...values, [name]:value}
        ))
    }
    const handleFetch = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/auth/login', {
                username: value.username,
                password: value.password
            })
            if (res.data.message) {setErrorMessage(res.data.message)}
            else {
                setErrorMessage(null)
                Navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className={"connexion-wrapper background-connexion"}>
            <ThemeButton />
            <div className={"connexion-header"}>
                <Link className={"bg-primary-accent-2"} to={"/login"}><span>login</span></Link>
                <span className={"bar"}></span>
                <Link to={"/signup"}><span>sign up</span></Link>
            </div>
            <form onSubmit={handleFetch} className={"connexion-form"}>
                <label className={"connexion-input"}>
                    <input
                        value={value.username}
                        onChange={handleChange}
                        id={"username"}
                        name={"username"}
                        type={"text"}
                        placeholder={"Enter your username..."}
                        required={true}
                    />
                </label>
                <label className={"connexion-input"}>
                    <input
                        value={value.password}
                        onChange={handleChange}
                        id={"password"}
                        name={"password"}
                        type={"password"}
                        placeholder={"Enter your password..."}
                        required={true}
                    />
                </label>


                <button className={"connexion-button"} type="submit">Login</button>
                {errorMessage ? <span className={"text-primary-accent-3 text-sm font-semibold text-center mt-2 p-0"}>{errorMessage}</span> : null}
            </form>
        </main>
    );
}

export default Login;