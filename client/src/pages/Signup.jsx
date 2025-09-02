import React, {useState} from 'react';
import {Link} from "react-router-dom";
// import axios from "axios";

function Signup() {
    const [value, setValue] = useState({username:"", email:"", password:""})
    const [picture, setPicture] = useState(); const [errorPicture, setErrorPicture] = useState(false)
    const [error, setError] = useState({errorUsername:false, errorEmail:false, errorPassword:false})

    const regexEmail = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{1,4}$")

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setValue(values => (
            {...values, [name]:value}
        ))
    }
    const handleUsername = () => {
        if (value.username==="") {
            setError(values => (
                {...values, errorUsername:true}
            ))
        } else setError(values => (
            {...values, errorUsername:false}
        ))
    }
    const handleEmail = () => {
        if (!regexEmail.test(value.email)) {
            setError(values => (
                {...values, errorEmail:true}
            ))
        } else setError(values => (
            {...values, errorEmail:false}
        ))
    }
    const handlePassword = () => {
        if (value.password.length < 7) {
            setError(values => (
                {...values, errorPassword:true}
            ))
        } else setError(values => (
            {...values, errorPassword:false}
        ))
    }

    const handlePicture = (e) => {
        if (e.target.files === undefined) return 0
        if (e.target.files[0].size < 500000) {
            setErrorPicture(false)
            setPicture(e.target.files[0])
        } else setErrorPicture(true)
    }

    // const handleFetch = async () => {
    //     try {
    //         return await axios.post('/api/auth/signup', {
    //             username: value.username,
    //             email: value.email,
    //             password: value.password,
    //             user_img: JSON.stringify(picture)
    //         })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        const allValid = !(error.errorPassword && error.errorUsername && error.errorEmail)

        if (allValid) {
            console.log("Ok good !")
            // handleFetch().then(r => console.log(r))
        } else {
            console.log("No Bad !")
        }
    }

    return (
        <main className={"connexion-wrapper background-connexion"}>
            <div className={"connexion-header"}>
                <Link to={"/login"}><span className={"link"}>login</span></Link>
                <span className={"bar"}></span>
                <Link className={"bg-primary-accent-2"} to={"/signup"}><span>sign up</span></Link>
            </div>

            <form onSubmit={handleSubmit} className={"connexion-form"}>
                <label className={"connexion-input"}>
                    <input
                        value={value.username}
                        onChange={handleChange}
                        onBlur={handleUsername}
                        id={"username"}
                        name={"username"}
                        type={"text"}
                        placeholder={"Enter your username..."}
                    />
                </label>
                {error.errorUsername ? <span className={"connexion-error"}>This field cannot be empty</span> : null}

                <label className={"connexion-input"}>
                    <input
                        value={value.email}
                        onChange={handleChange}
                        onBlur={handleEmail}
                        id={"email"}
                        name={"email"}
                        type={"email"}
                        placeholder={"Enter your email..."}
                    />
                </label>
                {error.errorEmail ? <span className={"connexion-error"}>Please enter a valid email !</span> : null}

                <label className={"connexion-input"}>
                    <input
                        value={value.password}
                        onChange={handleChange}
                        onBlur={handlePassword}
                        id={"password"}
                        name={"password"}
                        type={"password"}
                        placeholder={"Enter your password..."}
                    />
                </label>
                {error.errorPassword ? <span className={"connexion-error"}>Your password should contains at least 8 characters</span> : null}

                <label title={"profile picture"}>
                    <input className={`connexion-uploader`}
                           onChange={handlePicture}
                           id={"picture"}
                           name={"picture"}
                           type={"file"}
                           accept={"image/jpeg, image/jpg, image/png"}
                    />
                </label>
                {errorPicture ? <span className={"connexion-error"}>No more than 500ko file size</span> : null}

                <button className={"connexion-button"} type="submit">Sign up</button>
            </form>
        </main>
    );
}

export default Signup;