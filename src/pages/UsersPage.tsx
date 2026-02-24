import { NavLink, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectUsers } from '../features/users/selectors';

export default function UsersPage() {
  const users = useAppSelector(selectUsers);

  return (
    <div className="container">
      <h1>Список пользователей</h1>

      <div className="layout">
        <div className="panel">
          <ul className="usersList">
            {users.map((user) => (
              <li key={user.id}>
                <NavLink
                  to={`/users/${user.id}`}
                  className={({ isActive }) => (isActive ? 'activeLink' : '')}
                >
                  {user.name} ({user.email})
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
