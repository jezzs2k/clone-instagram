const users = [];

export const addUser = (data: { userId: number }) => {
  if (!data.userId) return { error: 'UserId are required.' };

  const existingUser = users.find((user) => user.id === data.userId);

  if (existingUser) return { user: existingUser };

  const user = { id: data.userId };

  users.push(user);

  return { user };
};

export const removeUser = (userId: number) => {
  const index = users.findIndex((user) => user.id === userId);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUser = (userId: number) => {
  const user = users.find((user) => user.id === userId);
  return { user };
};
