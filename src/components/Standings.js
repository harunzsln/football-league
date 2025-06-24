/*
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
*/

import React from 'react';
import { useSelector } from 'react-redux';
import ColorCircle from './ColorCircle'; // Bu component'in var olduğunu varsayıyoruz
import '../styles/Standings.css'; // Yeni CSS dosyamız

const Standings = () => {
  const teams = useSelector((state) => state.matches.teams);

  // Takımları puan, averaj ve atılan gole göre sırala
  const sortedTeams = [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;
    if (gdB !== gdA) return gdB - gdA;
    return b.goalsFor - a.goalsFor;
  });

  return (
   
    <div className="panel standings-panel">
      <h2 className="panel__title">Puan Durumu</h2>
      
      <div className="standings-table__wrapper">
        <table className="standings-table">
          <thead>
           
            <tr className="standings-table__row standings-table__row--header">
              
              <th className="standings-table__header-cell standings-table__header-cell--rank">#</th>
              <th className="standings-table__header-cell">Takım</th>
              <th className="standings-table__header-cell standings-table__header-cell--center">P</th>
              <th className="standings-table__header-cell standings-table__header-cell--center">A</th>
              <th className="standings-table__header-cell standings-table__header-cell--center">Y</th>
              <th className="standings-table__header-cell standings-table__header-cell--center">AV</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => (
              <tr key={team.id} className="standings-table__row">
               
                <td className="standings-table__cell standings-table__cell--rank">{index + 1}</td>
               
                <td className="standings-table__cell standings-table__cell--team">
                  <ColorCircle 
                    className="standings-table__team-badge" 
                    color1={team.primaryColor} 
                    color2={team.secondaryColor} 
                  />
                  <span>{team.name}</span>
                </td>
                <td className="standings-table__cell standings-table__cell--center">{team.points}</td>
                <td className="standings-table__cell standings-table__cell--center">{team.goalsFor}</td>
                <td className="standings-table__cell standings-table__cell--center">{team.goalsAgainst}</td>
                
                <td className="standings-table__cell standings-table__cell--center">
                  {team.goalsFor - team.goalsAgainst}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Standings;