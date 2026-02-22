import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: number;
  name: string;
  email: string;
};

type UsersState = {
  items: User[];
};

const initialState: UsersState = {
  items: [
    { id: 1, name: 'Алексей', email: 'alex@example.com' },
    { id: 2, name: 'Мария', email: 'maria@example.com' },
    { id: 3, name: 'Иван', email: 'ivan@example.com' },
  ],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserName: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const user = state.items.find((u) => u.id === action.payload.id);
      if (user) {
        user.name = action.payload.name;
      }
    },
  },
});

export const { updateUserName } = usersSlice.actions;
export default usersSlice.reducer;