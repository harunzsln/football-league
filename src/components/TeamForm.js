import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTeam, resetTeams } from "../features/teams/teamSlice";
import { resetLeague } from "../features/matches/matchSlice";
import { leagueStarted } from "../features/matches/matchSlice";
import "../styles/TeamForm.css"; // Assuming you have a CSS file for styling

const TeamForm = ({ handleStart }) => {
  const [teamName, setTeamName] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");

  const teams = useSelector((state) => state.teams);
  const dispatch = useDispatch();
  const leagueStarted = useSelector((state) => state.matches.leagueStarted);

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

    if (teamName.trim() === "") return;
    dispatch(addTeam({ name: teamName }));
    setTeamName("");
  };

  const handleReset = () => {
    dispatch(resetTeams());
    dispatch(resetLeague());
  };

  return (
    <section className="team-form">
      <h2>Takım Ekle</h2>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Takım adı girin"
        required
      />
      <input
          type="color"
          value={color1}
          onChange={(e) => setColor1(e.target.value)}
          required
        />
        <input
          type="color"
          value={color2}
          onChange={(e) => setColor2(e.target.value)}
          required
        />
      <button type="submit" disabled = {leagueStarted}>Ekle</button>
      </form>
      <button onClick={handleStart} disabled={useSelector((state) => state.matches.fixture.length > 0)}>
  Ligi Başlat
</button>


      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default TeamForm;
