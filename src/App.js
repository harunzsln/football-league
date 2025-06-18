import TeamForm from './components/TeamForm';
import StartLeagueButton from './components/StartLeagueButton'; 
import CurrentWeekMatches from './components/CurrentWeekMatches';
import ChampionModal from './components/ChampionModal';
import './App.css';
import { useSelector } from 'react-redux';


function App() {

  const leagueStarted = useSelector((state) => state.matches.started);

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>🏆 Futbol Ligi</h1>
      {!leagueStarted && <TeamForm />}
      {!leagueStarted && <StartLeagueButton />}
      {leagueStarted && <CurrentWeekMatches />}
      <ChampionModal />
    </div>
  );
}

export default App;
