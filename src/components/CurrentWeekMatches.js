import { useDispatch, useSelector } from "react-redux";
import { playCurrentWeek } from "../features/matches/matchSlice";  

const CurrentWeekMatches = () => {
    const dispatch = useDispatch();
    const teams = useSelector((state) => state.teams);
    const {fixture, currentWeek} = useSelector((state) => state.matches.currentWeek);

     if (!fixture || fixture.length === 0) {
    return <p>Fikstür yüklenemedi.</p>;
  }

    const weekIndex = currentWeek - 1;

    if (!matches) {
    return <p>Tüm haftalar tamamlandı!</p>;
  }

  const matches = fixture[weekIndex];

  const getTeamName = (id) => {
    const team = teams.find((t) => t.id === id);
    return team ? team.name : 'Bilinmeyen Takım';
  };

  const handlePlay = () => {
    // özel: dispatch içine asyncDispatch veriyoruz
    dispatch({
      type: 'matches/playCurrentWeek',
      asyncDispatch: dispatch
    });
  };

  return (
    <div>
      <h2>{currentWeek}. Hafta Maçları</h2>
      <ul>
        {matches.map((m, index) => (
          <li key={index}>
            {getTeamName(m.homeId)} vs {getTeamName(m.awayId)}
          </li>
        ))}
      </ul>
      <button onClick={handlePlay}>Haftayı Oynat</button>
    </div>
  );
};

export default CurrentWeekMatches;