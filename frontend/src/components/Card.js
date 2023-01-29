import React, { useContext } from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `grid-card__delete ${isOwn ? 'grid-card__delete_visible' : 'grid-card__delete_hidden'}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = `grid-card__like ${isLiked && 'grid-card__like_active'}`;

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleCardDelete() {
        props.onCardDelete(props.card);
    }

    return (
        <li className="grid-card">
            <article className="grid-card__container">
                <button
                    aria-label="Удалить"
                    className={cardDeleteButtonClassName}
                    onClick={handleCardDelete}
                    type="button"/>
                <img
                    alt={props.card.name}
                    className="grid-card__image"
                    src={props.card.link}
                    onClick={handleClick}/>
                <div className="grid-card__item">
                    <h2 className="grid-card__title">{props.card.name}</h2>
                    <div>
                        <button
                            aria-label="Лайк"
                            className={cardLikeButtonClassName}
                            onClick={handleLikeClick}
                            type="button"/>
                        <p className="grid-card__like-quantity">{props.card.likes.length}</p>
                    </div>
                </div>
            </article>
        </li>
    )
}

export default Card;