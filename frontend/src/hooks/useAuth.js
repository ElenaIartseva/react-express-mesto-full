import { useState, useEffect, useCallback } from 'react';
import { register, login, logout, checkToken } from '../utils/Auth.js';

export function useAuth({
  navigate,
  loadAppInfo,
  resetCardsData,
  showError,
  showRegisterFeedback,
}) {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    checkToken()
      .then((res) => {
        if (!res) {
          setLoggedIn(false);
          return;
        }
        setLoggedIn(true);
        return loadAppInfo().catch(showError);
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, [navigate, loadAppInfo, showError]);

  const handleRegister = useCallback(({ email, password }) => register({ email, password })
    .then((res) => {
      if (res) {
        navigate('/sign-in');
        return { isSuccess: true, message: '' };
      }
      return { isSuccess: false, message: '' };
    })
    .catch((err) => {
      navigate('/sign-up');
      return {
        isSuccess: false,
        message: err.message || 'Что-то пошло не так! Попробуйте ещё раз.',
      };
    })
    .then((feedback) => {
      showRegisterFeedback(feedback);
    }), [navigate, showRegisterFeedback]);

  const handleLogin = useCallback(({ email, password }) => login({ email, password })
    .then(() => {
      setLoggedIn(true);
      navigate('/');
      return loadAppInfo();
    })
    .catch(showError), [navigate, loadAppInfo, showError]);

  const handleSignout = useCallback(() => {
    logout()
      .catch(() => {})
      .finally(() => {
        setLoggedIn(false);
        resetCardsData();
        navigate('/sign-in');
      });
  }, [navigate, resetCardsData]);

  return {
    loggedIn,
    handleRegister,
    handleLogin,
    handleSignout,
  };
}
