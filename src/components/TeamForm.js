
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTeam } from "../features/teams/teamSlice"; 

import ColorCircle from './ColorCircle'; 
import "../styles/TeamForm.css"; 

const TeamForm = ({ handleStart }) => {
  const [teamName, setTeamName] = useState("");
  const [color1, setColor1] = useState("#FF0000"); 
  const [color2, setColor2] = useState("#FFFFFF"); 

  const teams = useSelector((state) => state.teams);
  const dispatch = useDispatch();
  const leagueStarted = useSelector((state) => state.matches.leagueStarted);
  const fixtureExists = useSelector((state) => state.matches.fixture.length > 0);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (teams.length >= 18) {
      alert('En fazla 18 takım oluşturabilirsiniz.');
      return;
    }

    if (teamName.trim() === '') {
      alert('Takım adı boş olamaz.');
      return;
    }
    
  
    if (teamName.trim() === "" || color1 === "" || color2 === "") {
      alert('Lütfen takım adı ve iki renk seçin.');
      return;
    }

    
    dispatch(addTeam({ name: teamName, primaryColor: color1, secondaryColor: color2 }));
    setTeamName("");
    setColor1("#FF0000");
    setColor2("#FFFFFF");
  };


  const isStartButtonDisabled = leagueStarted || teams.length < 2 || fixtureExists;

  return (
 
    <section className="panel team-form-panel">
      <h2 className="panel__title">Takım Oluştur</h2>
      
      <form className="team-form-panel__form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            className="form-input" 
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Takım adı..."
            required
            disabled={leagueStarted}
          />
       
          <div className="color-picker-group">
            <div className="color-picker__wrapper">
              <label htmlFor="color1" className="color-picker__label">1. Renk:</label>
              <input
                id="color1"
                className="color-picker__input"
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                title="Birincil Forma Rengi"
                disabled={leagueStarted}
              />
            </div>
            <div className="color-picker__wrapper">
              <label htmlFor="color2" className="color-picker__label">2. Renk:</label>
              <input
                id="color2"
                className="color-picker__input"
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                title="İkincil Forma Rengi"
                disabled={leagueStarted}
              />
            </div>
          </div>
          <button type="submit" className="btn btn--primary" disabled={leagueStarted}>
            Ekle
          </button>
        </div>
      </form>
 
      <div className="team-list__container">
        <h3 className="team-list__title">Takımlar ({teams.length})</h3>
        <ul className="team-list">
          {teams.length > 0 ? (
            teams.map((team) => (
              <li key={team.id} className="team-list__item">
              
                <ColorCircle 
                  color1={team.primaryColor} 
                  color2={team.secondaryColor} 
                  className="team-list__color-circle"
                />
                <span className="team-list__name">{team.name}</span>
              </li>
            ))
          ) : (
       
            <li className="team-list__item--empty">Henüz takım eklenmedi.</li>
          )}
        </ul>
      </div>

      
      <button 
        onClick={handleStart} 
        className="btn btn--start-league" 
        disabled={isStartButtonDisabled}>
        Ligi Başlat
      </button>
    </section>
  );
};

export default TeamForm;