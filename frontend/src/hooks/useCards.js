import { useState, useCallback } from 'react';
import { api } from '../utils/Api.js';
import { isLikedByUser } from '../utils/cardHelpers.js';

export function useCards({ currentUser, setCurrentUser, showError }) {
  const [cards, setCards] = useState([]);

  const loadAppInfo = useCallback(() => api.getAppInfo()
    .then(([cardsData, userData]) => {
      setCards(cardsData);
      setCurrentUser({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
        _id: userData._id,
        email: userData.email,
      });
    }), [setCurrentUser]);

  const resetCardsData = useCallback(() => {
    setCards([]);
    setCurrentUser({});
  }, [setCurrentUser]);

  const handleCardLike = useCallback((card) => {
    const liked = isLikedByUser(card.likes, currentUser._id);

    const request = liked ? api.deleteLike(card._id) : api.addLike(card._id);

    request
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch(showError);
  }, [currentUser._id, showError]);

  const deleteCardById = useCallback((cardID) => api.deleteCard(cardID)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== cardID));
    }), []);

  const handleAddPlace = useCallback((data) => api.newCardData(data)
    .then((newCard) => {
      setCards((prevCards) => [newCard, ...prevCards]);
    }), []);

  const handleUpdateUser = useCallback(({ name, about }) => api.userInformation({ name, about })
    .then((newProfile) => {
      setCurrentUser(newProfile);
    }), [setCurrentUser]);

  const handleUpdateAvatar = useCallback((avatar) => api.photoOfAvatar(avatar)
    .then((newAvatar) => {
      setCurrentUser(newAvatar);
    }), [setCurrentUser]);

  return {
    cards,
    loadAppInfo,
    resetCardsData,
    handleCardLike,
    deleteCardById,
    handleAddPlace,
    handleUpdateUser,
    handleUpdateAvatar,
  };
}
