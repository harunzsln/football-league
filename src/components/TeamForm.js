import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeam } from "../features/teams/teamSlice";

const TeamForm = () => {
    const dispatch = useDispatch();
    const teams = useSelector((state) => state.teams);

    const [teamName, setTeamName] = useState("");
    const [color1, setColor1] = useState("");
    const [color2, setColor2] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

    // Takım sayısı 18’i geçtiyse ekleme yapma
    if (teams.length >= 18) {
      alert('En fazla 18 takım oluşturabilirsiniz.');
      return;
    }

    if (teamName.trim() === '') {
      alert('Takım adı boş olamaz.');
      return;
    }

    const newTeam = {
      id: Date.now(), // benzersiz ID
      teamName,
      color1,
      color2
    };

    dispatch(addTeam(newTeam)); // Redux store’a ekle
    setTeamName(''); // Formu sıfırla
  };

  return (
    <div>
      <h2>Takım Ekle ({teams.length}/18)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Takım Adı"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <input
          type="color"
          value={color1}
          onChange={(e) => setColor1(e.target.value)}
        />
        <input
          type="color"
          value={color2}
          onChange={(e) => setColor2(e.target.value)}
        />
        <button type="submit" disabled={teams.length >= 18}>Takım Ekle</button>
      </form>
    </div>
  );
};

export default TeamForm;