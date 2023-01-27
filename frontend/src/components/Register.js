import React, {useState} from "react";
import { Link, withRouter } from 'react-router-dom';
import "./styles/Register.css";

function Register(props) {
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

        props.onRegistry({password, email});
    }

    return(
        <div className="login">
            <h3 className="login__title">Регистрация</h3>
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
                    <button className="login__link" onClick={handleSubmit}>Зарегистрироваться</button>
                </div>
            </form>
            <div className="register__signup">
                <p className="register__subtitle">Уже зарегистрированы?</p>
                <Link to="signin" className="signup__link">Войти</Link>
            </div>
        </div>
    )
}

export default withRouter(Register);