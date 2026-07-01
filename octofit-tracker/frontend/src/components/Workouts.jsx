import { useEffect, useState } from 'react';
import { API_BASE, toArray } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/workouts/`)
      .then((r) => r.json())
      .then((data) => setWorkouts(toArray(data)))
      .catch(() => setError('Failed to load workouts.'));
  }, []);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-3">💪 Workouts</h2>
      <div className="row g-3">
        {workouts.map((w) => (
          <div key={w._id} className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="card-title">{w.name}</h5>
                  <span className={`badge bg-${w.difficulty === 'hard' ? 'danger' : w.difficulty === 'medium' ? 'warning' : 'success'}`}>
                    {w.difficulty}
                  </span>
                </div>
                <p className="card-text text-muted">{w.description}</p>
                <p className="card-text"><small>⏱ {w.duration} min</small></p>
                {w.exercises?.length > 0 && (
                  <ul className="list-group list-group-flush">
                    {w.exercises.map((ex, i) => (
                      <li key={i} className="list-group-item px-0 py-1">
                        {ex.name} — {ex.sets}×{ex.reps}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
