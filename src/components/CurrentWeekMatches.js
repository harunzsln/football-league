

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
    return <p className="info-message">Fikstür yüklenemedi.</p>;
  }

  const matches = fixture[currentWeek - 1];

  if (!matches) {
    return <p className="info-message">Tüm haftalar tamamlandı!</p>;
  }

  const getTeamById = (id) => {
    return teams.find((team) => team.id === id);
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

          if (!home || !away) {
            console.warn(`Takım bilgisi bulunamadı: Ev Sahibi ID: ${m.homeId}, Deplasman ID: ${m.awayId}`);
            return null; 
          }

          return (
            <li key={index} className="match-item">
              <ColorCircle
                color1={home.primaryColor}
                color2={home.secondaryColor}
                className="team-color-circle"
              />
              <span className="team-name">{home.name}</span>
              <span className="vs-text">vs</span>
              <ColorCircle
                color1={away.primaryColor}
                color2={away.secondaryColor}
                className="team-color-circle"
              />
              <span className="team-name">{away.name}</span>
              
              {m.homeGoals !== null && (
                <span className="match-score">
                  ({m.homeGoals} - {m.awayGoals})
                </span>
              )}
            </li>
          );
        })}
      </ul>
      <button className="play-button" onClick={handlePlay}>
        Haftayı Oynat
      </button>
    </div>
  );
};

export default CurrentWeekMatches;