import React, {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <div className="content">
            <section className="profile">
                <button className="profile__avatar-button" onClick={props.onEditAvatar}>
                    <img alt="аватар пользователя" className="profile__avatar" src={currentUser.avatar}/>
                </button>
                <div className="profile__info">
                    <h1 className="profile__user-name">{currentUser.name}</h1>
                    <button aria-label="Редактировать" className="profile__edit-button" id="edit-button" type="button"
                            onClick={props.onEditProfile}/>
                    <p className="profile__user-vocation">{currentUser.about}</p>
                </div>
                <button aria-label="Добавить" className="profile__add-button" id="add-button" type="button" onClick={props.onAddPlace}/>
            </section>
            <section className="elements">
                <ul className="grid-cards">
                    {props.cards.map((item) => (
                            <Card
                                card={item}
                                key={item._id}
                                onCardClick={props.onCardClick}
                                onCardLike={props.onCardLike}
                                onCardDelete={props.onCardDelete}/>
                        ))
                    }
                </ul>
            </section>
        </div>
    )
}

export default Main;