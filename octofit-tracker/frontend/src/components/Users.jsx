import { useEffect, useState } from 'react';
import { API_BASE, toArray } from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/users/`)
      .then((r) => r.json())
      .then((data) => setUsers(toArray(data)))
      .catch(() => setError('Failed to load users.'));
  }, []);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-3">👤 Users</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Fitness Level</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>
                <span className={`badge bg-${u.fitness_level === 'advanced' ? 'danger' : u.fitness_level === 'intermediate' ? 'warning' : 'success'}`}>
                  {u.fitness_level}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
