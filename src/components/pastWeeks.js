import { useSelector } from 'react-redux';

const PastWeeks = () => {
  const teams = useSelector((state) => state.teams);
  const { matchResults } = useSelector((state) => state.matches);

  // Her takımın ismini almak için yardımcı fonksiyon
  const getTeamBadge = (id) => {
    const team = teams.find((t) => t.id === id);
    return team ? team.teamName : '???';
  };

  // Hafta bazında gruplama
  const groupedByWeek = {};
  matchResults.forEach((match) => {
    if (!groupedByWeek[match.week]) {
      groupedByWeek[match.week] = [];
    }
    groupedByWeek[match.week].push(match);
  });

  // Haftaları sırayla yazdır
  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Geçmiş Haftalar</h3>
      {Object.keys(groupedByWeek).sort((a, b) => a - b).map((week) => (
        <div key={week} style={{ marginBottom: '1rem' }}>
          <strong>{week}. Hafta</strong>
          <ul>
            {groupedByWeek[week].map((match, index) => (
              <li key={index}>
                {getTeamBadge(match.homeId)} {match.homeGoals} - {match.awayGoals} {getTeamBadge(match.awayId)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PastWeeks;
