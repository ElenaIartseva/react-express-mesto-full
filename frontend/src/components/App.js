import React, { useState } from 'react';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { Main } from './Main.js';
import { PopupWithForm } from './PopupWithForm.js';
import { ImagePopup } from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedRouteElement } from './ProtectedRoute.js';
import { Login } from './Login.js';
import { Register } from './Register.js';
import { InfoTooltip } from './InfoTooltip.js';
import { useAuth } from '../hooks/useAuth.js';
import { useCards } from '../hooks/useCards.js';
import { usePopups } from '../hooks/usePopups.js';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  const {
    isSuccessPopupOpen,
    isSuccessImage,
    popupMessage,
    isLoading,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isDeletePopupOpen,
    selectedCard,
    showError,
    showRegisterFeedback,
    closeAllPopups,
    openEditProfilePopup,
    openAddPlacePopup,
    openEditAvatarPopup,
    openDeletePopup,
    openImagePopup,
    handleConfirmDelete,
    runWithLoading,
  } = usePopups();

  const {
    cards,
    loadAppInfo,
    resetCardsData,
    handleCardLike,
    deleteCardById,
    handleAddPlace,
    handleUpdateUser,
    handleUpdateAvatar,
  } = useCards({ currentUser, setCurrentUser, showError });

  const {
    loggedIn,
    handleRegister,
    handleLogin,
    handleSignout,
  } = useAuth({
    navigate,
    loadAppInfo,
    resetCardsData,
    showError,
    showRegisterFeedback,
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          onSignOut={handleSignout}
          email={currentUser.email || ''}
        />
        <Routes>
          <Route path="/" element={
            <ProtectedRouteElement
              element={Main}
              onEditProfile={openEditProfilePopup}
              onAddPlace={openAddPlacePopup}
              onEditAvatar={openEditAvatarPopup}
              onCardClick={openImagePopup}
              onCardLike={handleCardLike}
              onCardDelete={openDeletePopup}
              cards={cards}
              loggedIn={loggedIn}
            />
          } />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
        </Routes>

        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={(data) => runWithLoading(() => handleUpdateUser(data))}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={(data) => runWithLoading(() => handleAddPlace(data))}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={(data) => runWithLoading(() => handleUpdateAvatar(data))}
          isLoading={isLoading}
        />

        <PopupWithForm
          name="confirm-delete"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={(evt) => handleConfirmDelete(evt, deleteCardById)}
        />

        <ImagePopup name="popup_open-image" onClose={closeAllPopups} card={selectedCard} />

        <InfoTooltip
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccessImage}
          message={popupMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export { App };
