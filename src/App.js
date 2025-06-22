

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TeamForm from "./components/TeamForm";
import CurrentWeekMatches from "./components/CurrentWeekMatches";
import Standings from "./components/Standings";
import { startLeague } from "./features/matches/matchSlice";
import AllWeeksMatches from "./components/AllWeeksMatches";
import ChampionModal from "./components/ChampionModal";

const App = () => {
  const teams = useSelector((state) => state.teams);
  const fixture = useSelector((state) => state.matches.fixture);
  const dispatch = useDispatch();

  const handleStart = () => {
    if (teams.length < 5) {
      alert("Ligi başlatmak için en az 5 takım gerekli.");
      return;
    }
    dispatch(startLeague(teams));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>⚽ Mini Futbol Ligi</h1>
      <TeamForm />
      <button onClick={handleStart} disabled={fixture.length > 0}>
        Ligi Başlat
      </button>

      {fixture.length > 0 && (
        <>
          <CurrentWeekMatches />
          <Standings />
          <AllWeeksMatches/>
          <ChampionModal />
        </>
      )}
    </div>
  );
};

export default App;
