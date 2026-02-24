import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../test/test-utils';
import App from '../App';

describe('App (тест компонента)', () => {
  it('редирект с / на /users отображает список пользователей', () => {
    render(<App />, { routerProps: { initialEntries: ['/'] } });
    expect(screen.getByText(/Список пользователей/)).toBeInTheDocument();
  });

  it('на неизвестном маршруте показывает "Страница не найдена"', () => {
    render(<App />, { routerProps: { initialEntries: ['/unknown'] } });
    expect(screen.getByText(/Страница не найдена/)).toBeInTheDocument();
  });

  it('на /users показывает список и плейсхолдер деталей', () => {
    render(<App />, { routerProps: { initialEntries: ['/users'] } });
    expect(screen.getByText(/Список пользователей/)).toBeInTheDocument();
    expect(screen.getByText(/Выберите пользователя слева/)).toBeInTheDocument();
  });
});
