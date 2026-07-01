import { NavLink, Route, Routes } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

const NAV = [
  { path: '/users', label: '👤 Users' },
  { path: '/teams', label: '🏆 Teams' },
  { path: '/activities', label: '🏃 Activities' },
  { path: '/leaderboard', label: '🥇 Leaderboard' },
  { path: '/workouts', label: '💪 Workouts' },
];

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <NavLink className="navbar-brand fw-bold" to="/">🐙 OctoFit Tracker</NavLink>
        <div className="navbar-nav flex-row gap-2">
          {NAV.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `nav-link${isActive ? ' active fw-semibold text-warning' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={
            <div className="container py-5 text-center">
              <h1 className="display-5 fw-bold">Welcome to OctoFit Tracker 🐙</h1>
              <p className="lead text-muted">Track activities, manage teams, and climb the leaderboard.</p>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

