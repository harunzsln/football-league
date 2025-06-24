

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TeamForm from "./components/TeamForm";
import CurrentWeekMatches from "./components/CurrentWeekMatches";
import Standings from "./components/Standings";
import { startLeague } from "./features/matches/matchSlice";
import AllWeeksMatches from "./components/AllWeeksMatches";
import ChampionModal from "./components/ChampionModal";
import "./App.css"; 

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
    <div className="app-container"> 
      
    
      <h1 className="main-app-title">⚽ Edict Futbol Ligi</h1>

     
      <div className="top-section">
        
       
        <div className="card-wrapper team-form-wrapper">
          <TeamForm handleStart={handleStart} />
        </div>

        
        {fixture.length > 0 && (
          <div className="card-wrapper current-week-matches-wrapper">
            <CurrentWeekMatches />
          </div>
        )}

        
        {fixture.length > 0 && (
          <div className="card-wrapper all-weeks-matches-wrapper">
            <AllWeeksMatches />
          </div>
        )}
      </div> 

     
      {fixture.length > 0 && ( 
        <div className="bottom-section">
          
      
          <div className="card-wrapper standings-wrapper">
            <Standings />
          </div>
          
         
          <ChampionModal /> 

        </div> 
      )}
      
    </div> 
  );
    
};

export default App;
