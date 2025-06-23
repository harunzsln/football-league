
import React from 'react';
import { useSelector } from 'react-redux';
import ColorCircle from './ColorCircle';
import { generateFixture } from '../utils/generateFixture';
import '../styles/Standings.css';

const Standings = () => {
  const teams = useSelector((state) => state.matches.teams);
  

  const sortedTeams = [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;
    if (gdB !== gdA) return gdB - gdA;
    return b.goalsFor - a.goalsFor;
  });

  return (
    <div className="standings">
      <h2>Puan Durumu</h2>
      <table>
        <thead>
          <tr>
            <th>Takım</th>
            <th>Puan</th>
            <th>A</th>
            <th>Y</th>
            <th>AV</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team) => (
            <tr key={team.id}>
              <td>
                <ColorCircle className="color-icon" color1={team.primaryColor} color2={team.secondaryColor} />
                {team.name}
              </td>
              <td>{team.points}</td>
              <td>{team.goalsFor}</td>
              <td>{team.goalsAgainst}</td>
              <td>{team.goalsFor - team.goalsAgainst}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;

