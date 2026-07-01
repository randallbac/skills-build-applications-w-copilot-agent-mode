import { useEffect, useState } from 'react';
import { API_BASE, toArray } from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/teams/`)
      .then((r) => r.json())
      .then((data) => setTeams(toArray(data)))
      .catch(() => setError('Failed to load teams.'));
  }, []);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-3">🏆 Teams</h2>
      <div className="row g-3">
        {teams.map((t) => (
          <div key={t._id} className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{t.name}</h5>
                <p className="card-text text-muted">{t.description}</p>
                <p className="card-text">
                  <small className="text-secondary">
                    {t.members?.length ?? 0} member{t.members?.length !== 1 ? 's' : ''}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
