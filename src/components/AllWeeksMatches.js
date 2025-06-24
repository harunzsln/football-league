import React from 'react';
import { useSelector } from 'react-redux';
import ColorCircle from './ColorCircle'; 
import '../styles/allWeekMatches.css'; 
const AllWeeksMatches = () => {
  const fixture = useSelector((state) => state.matches.fixture);
  const teams = useSelector((state) => state.teams);


  const getTeam = (id) => teams.find((team) => team.id === id);


  if (!fixture || fixture.length === 0) {
    return <p className="info-message">Geçmiş hafta sonuçları yüklenemedi.</p>;
  }

  return (
    <div className="all-weeks-container">
      <h2 className="all-weeks-header">Geçmiş Hafta Sonuçları</h2>
      {fixture.map((week, i) => (
       
        <div key={i} className="week-block">
          <h3 className="week-header">{i + 1}. Hafta</h3>
          <ul className="match-list-all-weeks">
            {week.map((match, index) => {
              const home = getTeam(match.homeId);
              const away = getTeam(match.awayId);

          
              if (!home || !away) {
                console.warn(`Team data not found for match: Home ID ${match.homeId}, Away ID ${match.awayId}`);
                return null; 
              }

              return (
                <li key={index} className="match-item-all-weeks">
                  <ColorCircle
                    color1={home.primaryColor}
                    color2={home.secondaryColor}
                    className="team-color-circle"
                  />
                  <span className="team-name-all-weeks">{home.name}</span>
                  <span className="score-separator">{match.homeGoals ?? '-'} : {match.awayGoals ?? '-'}</span>
                  <ColorCircle
                    color1={away.primaryColor}
                    color2={away.secondaryColor}
                    className="team-color-circle" 
                  />
                  <span className="team-name-all-weeks">{away.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AllWeeksMatches;