import { useDispatch, useSelector } from "react-redux"; 
import { startLeague } from "../features/matches/matchSlice";
import { generateFixture } from "../utils/generateFixture"

const StartLeagueButton = () => {
    const dispatch = useDispatch()
    const teams = useSelector((state) => state.teams);
    const leagueStarted = useSelector((state) => state.matches.started);

    const handleStart = () => {
  const fixture = generateFixture(teams);
  console.log("✅ Oluşturulan fikstür:", fixture); 

  dispatch(startLeague(fixture));
};

    if (leagueStarted || teams.length < 5) {
        return null;
    }

    return (
        <button onClick={handleStart} className="start-league-button">
            Ligi Başlat
        </button>
    );
}
export default StartLeagueButton;
