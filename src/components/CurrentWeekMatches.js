import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColorCircle from '../components/ColorCircle';
import '../styles/CurrentWeekMatches.css';
const CurrentWeekMatches = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const fixture = useSelector((state) => state.matches.fixture);
  const currentWeek = useSelector((state) => state.matches.currentWeek);

  if (!fixture || fixture.length === 0) {
    return <p>Fikstür yüklenemedi.</p>;
  }

  const matches = fixture[currentWeek - 1];
  if (!matches) {
    return <p>Tüm haftalar tamamlandı!</p>;
  }

  const getTeamById = (id) => {
    return teams.find((team) => team.id === id)
  };

  const handlePlay = () => {
    dispatch({ type: 'matches/playCurrentWeek', asyncDispatch: dispatch });
  };

  return (
    <div className="match-card">
      <h2>{currentWeek}. Hafta Maçları</h2>
      <ul className="match-list">
        {matches.map((m, index) => {
          const home = getTeamById(m.homeId);
          const away = getTeamById(m.awayId);
          return (
            <li key={index}  className="match-item">
              <ColorCircle color1={home.primaryColor} color2={home.secondaryColor} />
              {home.name} vs
              <ColorCircle color1={away.primaryColor} color2={away.secondaryColor} />
              {away.name}
              {m.homeGoals !== null && ` (${m.homeGoals} - ${m.awayGoals})`}
            </li>
          );
        })}
      </ul>
      <button onClick={handlePlay}>Haftayı Oynat</button>
    </div>
  );
};

export default CurrentWeekMatches;