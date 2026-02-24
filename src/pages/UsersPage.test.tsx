import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../test/test-utils';
import UsersPage from './UsersPage';

describe('UsersPage (тест компонента)', () => {
  it('рендерит заголовок списка пользователей', () => {
    render(<UsersPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Список пользователей'
    );
  });

  it('отображает всех пользователей из store', () => {
    render(<UsersPage />);
    expect(screen.getByText(/Алексей/)).toBeInTheDocument();
    expect(screen.getByText(/Мария/)).toBeInTheDocument();
    expect(screen.getByText(/Иван/)).toBeInTheDocument();
  });

  it('ссылки ведут на страницы пользователей', () => {
    render(<UsersPage />);
    const linkToUser1 = screen.getByRole('link', { name: /Алексей/ });
    expect(linkToUser1).toHaveAttribute('href', '/users/1');
  });
});
