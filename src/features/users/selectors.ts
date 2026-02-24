import type { RootState } from '../../app/store';

export const selectUsers = (state: RootState) => state.users.items;

export const selectUserById = (state: RootState, userId: number) =>
  state.users.items.find((user) => user.id === userId);
