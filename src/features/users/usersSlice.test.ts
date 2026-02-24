import { describe, it, expect } from 'vitest';
import usersReducer, { updateUserName } from './usersSlice';

const initialState = {
  items: [
    { id: 1, name: 'Алексей', email: 'alex@example.com' },
    { id: 2, name: 'Мария', email: 'maria@example.com' },
    { id: 3, name: 'Иван', email: 'ivan@example.com' },
  ],
};

describe('usersSlice (синхронные тесты редьюсера)', () => {
  it('возвращает начальное состояние', () => {
    const state = usersReducer(undefined, { type: 'unknown' });
    expect(state.items).toHaveLength(3);
    expect(state.items[0].name).toBe('Алексей');
  });

  it('updateUserName обновляет имя пользователя по id', () => {
    const state = usersReducer(
      initialState,
      updateUserName({ id: 2, name: 'Мария Петрова' })
    );
    expect(state.items[1].name).toBe('Мария Петрова');
    expect(state.items[1].email).toBe('maria@example.com');
  });

  it('updateUserName не меняет других пользователей', () => {
    const state = usersReducer(
      initialState,
      updateUserName({ id: 1, name: 'Новое Имя' })
    );
    expect(state.items[0].name).toBe('Новое Имя');
    expect(state.items[1].name).toBe('Мария');
    expect(state.items[2].name).toBe('Иван');
  });

  it('updateUserName не падает при несуществующем id', () => {
    const state = usersReducer(
      initialState,
      updateUserName({ id: 99, name: 'Призрак' })
    );
    expect(state.items).toEqual(initialState.items);
  });
});
