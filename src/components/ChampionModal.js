import { useSelector } from "react-redux";
import Standings from "./Standings";
import React from "react";
import "../styles/championModal.css"; 

const ChampionModal = () => {
    const teams = useSelector((state) => state.matches.teams);
    const { fixture, currentWeek } = useSelector((state) => state.matches);

    if (currentWeek <= fixture.length) return null; // Ligi bitirmedik

  
    const sortedTeams = [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const avA = a.goalsFor - a.goalsAgainst;
    const avB = b.goalsFor - b.goalsAgainst;
    return avB - avA;
  });

  const champion = sortedTeams[0];

    return (
    <div className="modal"
      style={{
        
        padding: '2rem',
        borderRadius: '1rem',
        marginTop: '2rem',
        textAlign: 'center',
        boxShadow: '0 0 20px gold',
      }}
    >
      🏆 <strong>{champion.name}</strong> Şampiyon Oldu!
    </div>
  );
};


export default ChampionModal;