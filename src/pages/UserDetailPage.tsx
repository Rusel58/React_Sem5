import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUserById } from '../features/users/selectors';
import { updateUserName } from '../features/users/usersSlice';

export default function UserDetailPage() {
  const { userId } = useParams();
  const dispatch = useAppDispatch();

  const id = Number(userId);
  const user = useAppSelector((state) => selectUserById(state, id));

  const [name, setName] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (!userId || Number.isNaN(id)) {
    return <p>Некорректный ID пользователя.</p>;
  }

  if (!user) {
    return <p>Пользователь не найден.</p>;
  }

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    dispatch(updateUserName({ id, name: trimmed }));
  };

  return (
    <div>
      <h2>Детальная страница пользователя</h2>

      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <div className="formRow">
        <label htmlFor="user-name">Имя:</label>
        <input
          id="user-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button onClick={handleSave}>Сохранить имя</button>
    </div>
  );
}