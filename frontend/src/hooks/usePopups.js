import { useState, useCallback } from 'react';

export function usePopups() {
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
  const [isSuccessImage, setIsSuccessImage] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const showError = useCallback((err) => {
    setIsSuccessImage(false);
    setPopupMessage(err.message || 'Что-то пошло не так! Попробуйте ещё раз.');
    setSuccessPopupOpen(true);
  }, []);

  const showRegisterFeedback = useCallback(({ isSuccess, message }) => {
    setIsSuccessImage(isSuccess);
    setPopupMessage(message);
    setSuccessPopupOpen(true);
  }, []);

  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setCardToDelete(null);
    setSuccessPopupOpen(false);
    setPopupMessage('');
    setSelectedCard(null);
  }, []);

  const openDeletePopup = useCallback((cardID) => {
    setCardToDelete(cardID);
    setIsDeletePopupOpen(true);
  }, []);

  const handleConfirmDelete = useCallback((evt, deleteCardById) => {
    evt.preventDefault();
    if (!cardToDelete) return;

    setIsLoading(true);
    deleteCardById(cardToDelete)
      .then(closeAllPopups)
      .catch(showError)
      .finally(() => setIsLoading(false));
  }, [cardToDelete, closeAllPopups, showError]);

  const runWithLoading = useCallback((request) => {
    setIsLoading(true);
    return request()
      .then(closeAllPopups)
      .catch(showError)
      .finally(() => setIsLoading(false));
  }, [closeAllPopups, showError]);

  return {
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
    openEditProfilePopup: () => setIsEditProfilePopupOpen(true),
    openAddPlacePopup: () => setIsAddPlacePopupOpen(true),
    openEditAvatarPopup: () => setIsEditAvatarPopupOpen(true),
    openDeletePopup,
    openImagePopup: setSelectedCard,
    handleConfirmDelete,
    runWithLoading,
  };
}
