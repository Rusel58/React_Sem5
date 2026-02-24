import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';
import { store } from '../app/store';

function AllTheProviders({
  children,
  routerProps = {},
}: {
  children: React.ReactNode;
  routerProps?: MemoryRouterProps;
}) {
  return (
    <Provider store={store}>
      <MemoryRouter {...routerProps}>{children}</MemoryRouter>
    </Provider>
  );
}

function customRender(
  ui: ReactElement,
  options?: RenderOptions & { routerProps?: MemoryRouterProps }
) {
  const { routerProps, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders routerProps={routerProps}>{children}</AllTheProviders>
    ),
    ...renderOptions,
  });
}

export * from '@testing-library/react';
export { customRender as render };
