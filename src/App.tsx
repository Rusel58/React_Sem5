import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';

function EmptyDetails() {
  return <p>Выберите пользователя слева, чтобы открыть детали.</p>;
}

function NotFound() {
  return <p>Страница не найдена.</p>;
}

function UserDetailRoute() {
  const { userId } = useParams();
  return <UserDetailPage key={userId} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" replace />} />

      <Route path="/users" element={<UsersPage />}>
        <Route index element={<EmptyDetails />} />
        <Route path=":userId" element={<UserDetailRoute />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
