import headerLogo from "../images/header-logo.svg";
import React from 'react';
import {Link, Route, Switch} from "react-router-dom";

function Header(props) {
    return (
        <div className="header">
            <img alt="Логотип Mesto Russia" className="header__logo" src={headerLogo}/>
            <Switch>
                <Route path='/signup'>
                    <Link to="/signin" className='header__link'>Войти</Link>
                </Route>
                <Route path='/signin'>
                    <Link to="/signup" className='header__link'>Регистрация</Link>
                </Route>
                <Route path='/'>
                    <div className='header__container'><p className='header__email'>{props.email}</p><Link to="/signin" onClick={props.signOut}
                                                                                                           className='header__link'>Выйти</Link></div>
                </Route>
            </Switch>
        </div>
    )
}

export default Header;