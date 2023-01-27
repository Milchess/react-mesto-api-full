import React, { useState } from "react";
import { withRouter } from 'react-router-dom';

function Login(props) {
    const[password, setPassword] = useState('');
    const[email, setEmail] = useState('');

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAuth({password, email});
    }

    return(
        <div className="login">
           <h3 className="login__title">Вход</h3>
            <form className="login__form">
                <input
                    className="login__form-input"
                    required
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChangeEmail}/>
                <input
                    className="login__form-input"
                    required
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    onChange={handleChangePassword}/>
                <div className="login__button-container">
                    <button
                        className="login__link"
                        onClick={handleSubmit}
                    >Войти</button>
                </div>
            </form>
        </div>
    )
}

export default withRouter(Login);