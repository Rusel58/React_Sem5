/**
 * Утилита с задержкой для демонстрации асинхронных тестов.
 * В реальном приложении здесь мог бы быть вызов API.
 */
export function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

/**
 * Имитация загрузки данных пользователя по ID.
 */
export async function fetchUserById(
  id: number,
  users: Array<{ id: number; name: string; email: string }>
): Promise<{ id: number; name: string; email: string } | null> {
  await delay(50, undefined);
  return users.find((u) => u.id === id) ?? null;
}
