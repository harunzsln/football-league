import { useSelector } from "react-redux";
import Standings from "./Standings";


const ChampionModal = () => {
    const teams = useSelector((state) => state.matches.teams);
    const { fixture, currentWeek } = useSelector((state) => state.matches);

    if (currentWeek <= fixture.length) return null; // Ligi bitirmedik

    const sorted = [...teams].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
    });

    const champion = sorted[0];

    return (
    <div
      style={{
        backgroundColor: '#282c34',
        color: 'white',
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