import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTeam, resetTeams } from "../features/teams/teamSlice";
import { resetLeague } from "../features/matches/matchSlice";

const TeamForm = () => {
  const [teamName, setTeamName] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");

  const teams = useSelector((state) => state.teams);
  const dispatch = useDispatch();

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
    <div>
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
      <button type="submit">Ekle</button>
      </form>

      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamForm;
