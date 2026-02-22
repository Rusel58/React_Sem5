import { Navigate, Route, Routes } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';

function EmptyDetails() {
  return <p>Выберите пользователя слева, чтобы открыть детали.</p>;
}

function NotFound() {
  return <p>Страница не найдена.</p>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" replace />} />

      <Route path="/users" element={<UsersPage />}>
        <Route index element={<EmptyDetails />} />
        <Route path=":userId" element={<UserDetailPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}