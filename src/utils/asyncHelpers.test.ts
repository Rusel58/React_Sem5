import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { delay, fetchUserById } from './asyncHelpers';

describe('delay (асинхронный тест)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('резолвит значение после указанной задержки', async () => {
    const promise = delay(100, 'result');
    vi.advanceTimersByTime(100);
    await expect(promise).resolves.toBe('result');
  });

  it('не резолвится до истечения таймера', async () => {
    let resolved = false;
    delay(100, 'x').then(() => {
      resolved = true;
    });
    vi.advanceTimersByTime(50);
    expect(resolved).toBe(false);
    vi.advanceTimersByTime(50);
    await Promise.resolve();
    expect(resolved).toBe(true);
  });
});

describe('fetchUserById (асинхронный тест)', () => {
  const users = [
    { id: 1, name: 'Алексей', email: 'alex@example.com' },
    { id: 2, name: 'Мария', email: 'maria@example.com' },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('возвращает пользователя по id после задержки', async () => {
    const result = fetchUserById(2, users);
    await vi.runAllTimersAsync();
    await expect(result).resolves.toEqual({
      id: 2,
      name: 'Мария',
      email: 'maria@example.com',
    });
  });

  it('возвращает null для несуществующего id', async () => {
    const result = fetchUserById(99, users);
    await vi.runAllTimersAsync();
    await expect(result).resolves.toBeNull();
  });
});
