import { useEffect, useState } from 'react';
import { API_BASE, toArray } from '../api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/leaderboard/`)
      .then((r) => r.json())
      .then((data) => setEntries(toArray(data)))
      .catch(() => setError('Failed to load leaderboard.'));
  }, []);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-3">🥇 Leaderboard</h2>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e._id} className={e.rank === 1 ? 'table-warning fw-bold' : ''}>
              <td>{e.rank}</td>
              <td>{e.user?.username ?? '—'}</td>
              <td>{e.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
