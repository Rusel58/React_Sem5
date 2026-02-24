import { describe, it, expect } from 'vitest';
import type { RootState } from '../../app/store';
import { selectUsers, selectUserById } from './selectors';

const mockState: RootState = {
  users: {
    items: [
      { id: 1, name: 'Алексей', email: 'alex@example.com' },
      { id: 2, name: 'Мария', email: 'maria@example.com' },
      { id: 3, name: 'Иван', email: 'ivan@example.com' },
    ],
  },
} as RootState;

describe('selectUsers (синхронный тест)', () => {
  it('возвращает список пользователей из state', () => {
    const result = selectUsers(mockState);
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({
      id: 1,
      name: 'Алексей',
      email: 'alex@example.com',
    });
  });

  it('возвращает тот же массив при повторном вызове', () => {
    const first = selectUsers(mockState);
    const second = selectUsers(mockState);
    expect(first).toBe(second);
  });
});

describe('selectUserById (синхронный тест)', () => {
  it('возвращает пользователя по существующему id', () => {
    const user = selectUserById(mockState, 2);
    expect(user).toEqual({
      id: 2,
      name: 'Мария',
      email: 'maria@example.com',
    });
  });

  it('возвращает undefined для несуществующего id', () => {
    const user = selectUserById(mockState, 99);
    expect(user).toBeUndefined();
  });

  it('возвращает первого пользователя для id 1', () => {
    const user = selectUserById(mockState, 1);
    expect(user?.name).toBe('Алексей');
  });
});
