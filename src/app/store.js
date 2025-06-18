import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "../features/teams/teamSlice";
import matchReducer from "../features/matches/matchSlice";


const store = configureStore({
    reducer: {
        teams: teamReducer,
        matches: matchReducer,
    },

});

export { store };
