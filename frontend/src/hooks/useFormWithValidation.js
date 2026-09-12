import { useCallback, useState } from 'react';

export function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((evt) => {
    const { name, value, validationMessage, form } = evt.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validationMessage,
    }));
    setIsValid(form.checkValidity());
  }, []);

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, []);

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  };
}
