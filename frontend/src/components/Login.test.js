import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Login } from './Login.js';

describe('Login', () => {
  test('keeps submit disabled until email and password are valid', () => {
    render(<Login onLogin={vi.fn()} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Пароль');
    const submitButton = screen.getByRole('button', { name: 'Войти' });

    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { name: 'email', value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: '123' } });

    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { name: 'email', value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });

    expect(submitButton).toBeEnabled();
  });
});
