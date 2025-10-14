import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

import PopupMessage from "../components/PopupMessage.jsx";
import ThemeButton from "../components/ThemeButton.jsx";

function Signup() {
    const [value, setValue] = useState({username:"", email:"", password:""});
    const [error, setError] = useState({});
    const [picture, setPicture] = useState(null);
    const [errorPicture, setErrorPicture] = useState(false);
    const [popupError, setPopupError] = useState(null)
    const Navigate = useNavigate()

    const regexEmail = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{1,4}$");

    // Pour gérer l'affichage du popup d'erreur : Disparaît après 6s.
    useEffect(() => {
        setTimeout(() => {
            setPopupError(null)
        }, 6000)
    }, [popupError]);

    const handleUsername = (v) => {
        if (v.length === 0) {
            setError(values => (
                {...values, errorUsername:true}
            ))
        } else setError(values => (
            {...values, errorUsername:false}
        ))
    }
    const handleEmail = (v) => {
        if (!regexEmail.test(v)) {
            setError(values => (
                {...values, errorEmail:true}
            ))
        } else setError(values => (
            {...values, errorEmail:false}
        ))
    }
    const handlePassword = (v) => {
        if (v.length < 8) {
            setError(values => (
                {...values, errorPassword:true}
            ))
        } else setError(values => (
            {...values, errorPassword:false}
        ))
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setValue(values => (
            {...values, [name]:value}
        ))
    }

    const handlePicture = (e) => {
        if (e.target.files === undefined) return setPicture(null)
        if (e.target.files[0].size < 500000) {
            setErrorPicture(false)
            setPicture(e.target.files[0])
        } else {
            setErrorPicture(true)
            setPicture(null)
        }
    }

    const upload = async () => {
        const formData = new FormData()
        formData.append('picture', picture)
        try {
            const res = await axios.post('/api/auth/upload', formData)
            return res.data
        } catch (error) {
            return setPopupError(error.message)
        }
    }

    const handleFetch = async () => {
        const user_img = await upload()
        try {
            const res = await axios.post('/api/auth/signup', {
                username: value.username,
                email: value.email,
                password: value.password,
                user_img: user_img ? 'user-pictures/' + user_img : null
            })
            Navigate("/login")
            return res
        } catch (error) {
            if (error.status === 400) setPopupError(error.response.data.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (error.errorUsername + error.errorPassword + error.errorEmail + errorPicture === 0) {
            handleFetch().then()
        } else {
            handleUsername(value.username);
            handleEmail(value.email);
            handlePassword(value.password);
        }
    }

    return (
        <main className={"connexion-wrapper background-connexion"}>
            <ThemeButton />
            {popupError ? <PopupMessage>{popupError}</PopupMessage>: null}
            <div className={"connexion-header"}>
                <Link to={"/login"}><span>login</span></Link>
                <span className={"bar"}></span>
                <Link className={"bg-primary-accent-2"} to={"/signup"}><span>sign up</span></Link>
            </div>

            <form onSubmit={handleSubmit} className={"connexion-form"}>
                <label className={"connexion-input"}>
                    <input
                        value={value.username}
                        onChange={(e) => {handleChange(e); handleUsername(e.target.value)}}
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
                        onChange={(e) => {handleChange(e); handleEmail(e.target.value)}}
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
                        onChange={(e) => {handleChange(e); handlePassword(e.target.value)}}
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
                    <span>{picture ? picture.name : "No file uploaded"}</span>
                </label>
                {errorPicture ? <span className={"connexion-error"}>No more than 500ko file size</span> : null}

                <button className={"connexion-button"} type="submit">Sign up</button>
            </form>
        </main>
    );
}

export default Signup;