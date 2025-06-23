import React from 'react';
import { useSelector } from 'react-redux';
import ColorCircle from './ColorCircle';

const AllWeeksMatches = () => {
  const fixture = useSelector((state) => state.matches.fixture);
  const teams = useSelector((state) => state.teams);

  const getTeam = (id) => teams.find((team) => team.id === id);

  return (
    <div className="past-weeks">
      <h2>Geçmiş Hafta Sonuçları</h2>
      {fixture.map((week, i) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <h3>{i + 1}. Hafta</h3>
          <ul>
            {week.map((match, index) => {
              const home = getTeam(match.homeId);
              const away = getTeam(match.awayId);

              return (
                <li key={index}>
                  <ColorCircle color1={home.primaryColor} color2={home.secondaryColor} />
                  {home.name} {match.homeGoals ?? '-'} : {match.awayGoals ?? '-'}
                  <ColorCircle color1={away.primaryColor} color2={away.secondaryColor} />
                  {away.name}
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
