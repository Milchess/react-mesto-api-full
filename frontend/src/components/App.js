import React, {useState, useEffect} from 'react';
import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePlacePopup from "./ConfirmDeletePlacePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
    const [currentUser, setCurrentUser] = useState('');
    const [cards, setCards] = useState([]);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [card, setCard] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [email, setEmail] = useState(null);
    const [tooltipStatus, setTooltipStatus] = useState('success');
    const history = useHistory();

    useEffect(validAuth, []);

    useEffect(() => {
        if (loggedIn)
            Promise.all([api.getInitialCards(), api.getUserInformation()])
                .then(([cards, user]) => {
                    setCards(cards);
                    setCurrentUser(user);
                })
                .catch(err => {
                    console.log(`Ошибка.....: ${err}`)
                });
    }, [loggedIn])

    function validAuth() {
        if (localStorage.getItem('token')) {
            api.getValidationToken()
                .then((res) => {
                    setLoggedIn(true);
                    setEmail(res.data.email);
                    history.push('/');
                })
                .catch(err => {
                    console.log(`Ошибка.....: ${err}`)
                });
        }
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log(`Ошибка.....: ${err}`)
            });
    }

    function handleCardDelete(card) {
        api.setDeleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
                closeAllPopups();
            })
            .catch(err => {
                console.log(`Ошибка.....: ${err}`)
            });
    }

    function handleUpdateUser(item) {
        api.setUserUpdate(item)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => {
                console.log(`Ошибка.....: ${err}`)
            });
    }

    function handleUpdateAvatar(item) {
        api.setUserAvatar(item)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => {
                console.log(`Ошибка.....: ${err}`)
            });
    }

    function handleAddPlaceSubmit(item) {
        api.setCreateCard(item)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => {
                console.log(`Ошибка.....: ${err}`)
            });
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleConfirmPopupClick(card) {
        setCard(card);
        setIsConfirmPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmPopupOpen(false);
        setSelectedCard({name: '', link: ''});
        setIsInfoTooltipOpen(false);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleSignIn(model) {
        api.getAuthorization(model)
            .then((data) => {
                setLoggedIn(true);
                setEmail(model.email);
                localStorage.setItem('token', data.token);
                history.push('/');
            })
            .catch(err => {
                handleInfoTooltip();
                setTooltipStatus('fail');
                console.log(`Ошибка.....: ${err}`)
            })
    }

    function handleSignOut() {
        localStorage.removeItem('token');
        history.push('/signin');
    }

    function handleSignUp(model) {
        api.setRegistration(model)
            .then(() => {
                setTooltipStatus('success');
                history.push('/signin');
            })
            .catch(err => {
                setTooltipStatus('fail');
                console.log(`Ошибка.....: ${err}`)
            }).finally(handleInfoTooltip);
    }

    function handleInfoTooltip() {
        setIsInfoTooltipOpen(true);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Header
                        signOut={handleSignOut}
                        email={email}/>

                    <Switch>
                        <Route path="/signin">
                            <Login
                                onAuth={handleSignIn}/>
                        </Route>

                        <Route path="/signup">
                            <Register
                                onRegistry={handleSignUp}/>
                        </Route>

                        <ProtectedRoute
                            exact path="/"
                            loggedIn={loggedIn}
                            component={Main}
                            onEditAvatar={handleEditAvatarClick}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleConfirmPopupClick}
                            cards={cards}
                        />

                        <Route exact path="">
                            {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
                        </Route>

                    </Switch>

                    <Footer/>

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}/>

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}/>

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}/>

                    <ConfirmDeletePlacePopup
                        isOpen={isConfirmPopupOpen}
                        onClose={closeAllPopups}
                        onConfirmDelete={handleCardDelete}
                        card={card}/>

                    <ImagePopup
                        onClose={closeAllPopups}
                        card={selectedCard}
                    />

                    <InfoTooltip
                        isOpen={isInfoTooltipOpen}
                        onClose={closeAllPopups}
                        tooltipStatus={tooltipStatus}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
