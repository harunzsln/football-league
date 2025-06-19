// src/components/Standings.js
import React from 'react';
import { useSelector } from 'react-redux';
import ColorCircle from './ColorCircle';
import { generateFixture } from '../utils/generateFixture';

const Standings = () => {
  const teams = useSelector((state) => state.teams);

  const sortedTeams = [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;
    if (gdB !== gdA) return gdB - gdA;
    return b.goalsFor - a.goalsFor;
  });

  return (
    <div>
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
                <ColorCircle color1={team.primaryColor} color2={team.secondaryColor} />
                {team.name}
              </td>
              <td>{t.points}</td>
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
