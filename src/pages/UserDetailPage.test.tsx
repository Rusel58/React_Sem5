import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { render } from '../test/test-utils';
import UserDetailPage from './UserDetailPage';

function renderUserDetail(initialEntry: string) {
  return render(
    <Routes>
      <Route path="/users/:userId" element={<UserDetailPage />} />
    </Routes>,
    { routerProps: { initialEntries: [initialEntry] } }
  );
}

describe('UserDetailPage (тест компонента)', () => {
  it('показывает сообщение при некорректном userId', () => {
    renderUserDetail('/users/invalid');
    expect(
      screen.getByText(/Некорректный ID пользователя/)
    ).toBeInTheDocument();
  });

  it('показывает сообщение при несуществующем пользователе', () => {
    renderUserDetail('/users/999');
    expect(screen.getByText(/Пользователь не найден/)).toBeInTheDocument();
  });

  it('отображает данные пользователя и форму редактирования имени', () => {
    renderUserDetail('/users/1');
    expect(
      screen.getByRole('heading', { name: /Детальная страница пользователя/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/alex@example.com/)).toBeInTheDocument();
    const input = screen.getByLabelText(/Имя/);
    expect(input).toHaveValue('Алексей');
  });

  it('обновляет имя по кнопке Сохранить', async () => {
    const user = userEvent.setup();
    renderUserDetail('/users/1');
    const input = screen.getByLabelText(/Имя/);
    await user.clear(input);
    await user.type(input, 'Новое Имя');
    await user.click(screen.getByRole('button', { name: /Сохранить имя/ }));
    expect(input).toHaveValue('Новое Имя');
  });
});
