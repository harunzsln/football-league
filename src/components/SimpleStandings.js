import { useSelector } from 'react-redux';

const SimpleStandings = () => {
  const teams = useSelector((state) => state.teams);

  const sorted = [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Puan Durumu</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Takım</th>
            <th>Puan</th>
            <th>Gol</th>
            <th>Averaj</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(team => (
            <tr key={team.id}>
              <td>{team.teamName}</td>
              <td>{team.points}</td>
              <td>{team.goalsFor}</td>
              <td>{team.goalDifference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleStandings;
