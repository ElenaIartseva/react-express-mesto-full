import { useState, useEffect, useCallback } from 'react';
import { register, login, logout, checkToken } from '../utils/Auth.js';

export function useAuth({
  navigate,
  loadAppInfo,
  resetCardsData,
  showError,
  showRegisterFeedback,
}) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkToken()
      .then((res) => {
        if (!res) {
          navigate('/sign-in');
          return;
        }
        setLoggedIn(true);
        return loadAppInfo().catch(showError);
      })
      .catch(() => {
        navigate('/sign-in');
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
