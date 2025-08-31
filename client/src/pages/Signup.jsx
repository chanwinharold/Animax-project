import React, {useState} from 'react';

function Signup() {
    const [value, setValue] = useState({username:"", email:"", password:""})
    const [picture, setPicture] = useState()
    const [error, setError] = useState({errorUsername: false, errorEmail: false, errorPassword: false})
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
        if (value.password.length < 8) {
            setError(values => (
                {...values, errorPassword:true}
            ))
        } else setError(values => (
            {...values, errorPassword:false}
        ))
    }

    const handlePicture = (e) => {
        setPicture(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUsername(); handleEmail(); handlePassword();
        const allValid = !(error.errorPassword && error.errorUsername && error.errorEmail)

        if (allValid) {
            console.log(value, picture)
            // Send data
            // Locate to Login Page
        }
    }

    return (
        <main className={"connexion-wrapper background-connexion"}>
            <div className={"connexion-header"}>
                <a>login</a>
                <span></span>
                <a className={"bg-primary-accent-2"}>sign up</a>
            </div>

            <form onSubmit={handleSubmit} className={"connexion-form"}>
                <label className={"connexion-input"}>
                    <input
                        value={value.username}
                        onChange={handleChange}
                        onInput={handleUsername}
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
                        onInput={handleEmail}
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
                        onInput={handlePassword}
                        id={"password"}
                        name={"password"}
                        type={"password"}
                        placeholder={"Enter your password..."}
                    />
                </label>
                {error.errorPassword ? <span className={"connexion-error"}>Your password should contains at least 8 characters</span> : null}

                <label>
                    <input className={"connexion-uploader"}
                           value={picture}
                           onChange={handlePicture}
                           id={"picture"}
                           name={"picture"}
                           type={"file"}
                    />
                </label>

                <button className={"connexion-button"} type="submit">Sign up</button>
            </form>
        </main>
    );
}

export default Signup;