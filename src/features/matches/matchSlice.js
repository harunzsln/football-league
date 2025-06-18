import { createSlice, current } from "@reduxjs/toolkit";
import { updateStats } from "../teams/teamSlice";

const initialState = {
    started: false,
    currentWeek: 0,
    fixture: []
};

const matchSlice = createSlice({
    name: 'matches',
    initialState,
    reducers: {
        startLeague: (state, action) => {
            state.started = true;
            state.currentWeek = 1;
            state.fixture = action.payload;
        },
        goToNextWeek: (state) => {
            state.currentWeek += 1;
        },
        playCurrentWeek: (state, action) => {
            const dispatch = action.asyncDispatch;
            const weekIndex = state.currentWeek - 1;
            const currentMatches = state.fixture[weekIndex];

            currentMatches.forEach((match) => {
                const homeGoals = Math.floor(Math.random() * 5);
                const awayGoals = Math.floor(Math.random() * 5);

                dispatch(
                    updateStats({
                        homeId: match.homeId,
                        awayId: match.awayId,
                        homeGoals,
                        awayGoals,
                    })
                );
            });
            state.currentWeek += 1;
        },    
    },

});
export const { startLeague, goToNextWeek, playCurrentWeek } = matchSlice.actions;
export default matchSlice.reducer;
