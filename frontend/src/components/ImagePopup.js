import React from "react";

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup-card ${card.link ? "popup_opened" : ""}`} id="popup-card-image">
            <figure className="popup-card__container">
                <button
                    aria-label="Закрыть"
                    className="popup__button-close"
                    id="popup-close-card__image_big"
                    type="button"
                    onClick={onClose}></button>
                <img alt={card.name} className="popup-card__image" src={card.link}/>
                <figcaption className="popup-card__title">{card.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup;