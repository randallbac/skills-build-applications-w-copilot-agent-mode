import { useEffect, useState } from 'react';
import { API_BASE, toArray } from '../api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/activities/`)
      .then((r) => r.json())
      .then((data) => setActivities(toArray(data)))
      .catch(() => setError('Failed to load activities.'));
  }, []);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-3">🏃 Activities</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Calories</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a) => (
            <tr key={a._id}>
              <td>{a.user?.username ?? '—'}</td>
              <td>{a.type}</td>
              <td>{a.duration}</td>
              <td>{a.calories}</td>
              <td>{new Date(a.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
