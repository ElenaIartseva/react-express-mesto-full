import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Card } from './Card.js';

const card = {
  _id: 'card-id',
  name: 'Test card',
  link: 'https://example.com/image.jpg',
  owner: { _id: 'owner-id' },
  likes: [],
};

function renderCard(currentUserId) {
  return render(
    <CurrentUserContext.Provider value={{ _id: currentUserId }}>
      <Card
        {...card}
        card={card}
        onCardClick={vi.fn()}
        onCardLike={vi.fn()}
        onCardDelete={vi.fn()}
      />
    </CurrentUserContext.Provider>,
  );
}

describe('Card', () => {
  test('shows delete button for owner', () => {
    const { container } = renderCard('owner-id');

    expect(container.querySelector('.element__button_delete')).toBeInTheDocument();
  });

  test('hides delete button for another user', () => {
    const { container } = renderCard('another-user-id');

    expect(container.querySelector('.element__button_delete')).not.toBeInTheDocument();
    expect(screen.getByText('Test card')).toBeInTheDocument();
  });
});
