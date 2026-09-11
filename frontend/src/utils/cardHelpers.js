export function getEntityId(entity) {
  if (!entity) return null;
  return typeof entity === 'object' ? entity._id : entity;
}

export function isOwner(owner, userId) {
  return getEntityId(owner) === userId;
}

export function isLikedByUser(likes, userId) {
  return likes.some((like) => getEntityId(like) === userId);
}
