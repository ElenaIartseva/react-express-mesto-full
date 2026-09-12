import { describe, expect, test } from 'vitest';
import { getEntityId, isLikedByUser, isOwner } from './cardHelpers.js';

describe('cardHelpers', () => {
  test('gets id from object or string entity', () => {
    expect(getEntityId({ _id: 'user-id' })).toBe('user-id');
    expect(getEntityId('user-id')).toBe('user-id');
    expect(getEntityId(null)).toBeNull();
  });

  test('detects card owner', () => {
    expect(isOwner({ _id: 'owner-id' }, 'owner-id')).toBe(true);
    expect(isOwner({ _id: 'another-id' }, 'owner-id')).toBe(false);
  });

  test('detects liked card for populated and raw ids', () => {
    const likes = [{ _id: 'first-user' }, 'second-user'];

    expect(isLikedByUser(likes, 'second-user')).toBe(true);
    expect(isLikedByUser(likes, 'third-user')).toBe(false);
  });
});
