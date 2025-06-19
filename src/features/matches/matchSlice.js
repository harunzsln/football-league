/*import { createSlice, current } from "@reduxjs/toolkit";
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
*/

// src/features/matches/matchSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { generateFixture } from "../../utils/generateFixture";
const initialState = {
  fixture: [],
  currentWeek: 1,
};

const matchSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    startLeague: (state, action) => {
      state.fixture = generateFixture(action.payload);
      state.currentWeek = 1;
    },
    playCurrentWeek: (state, action) => {
  const currentWeek = state.currentWeek - 1;
  const matches = state.fixture[currentWeek];

  if (!matches || matches.length === 0) return;

  matches.forEach((match) => {
    const homeGoals = Math.floor(Math.random() * 5);
    const awayGoals = Math.floor(Math.random() * 5);
    match.homeGoals = homeGoals;
    match.awayGoals = awayGoals;

    const home = state.teams.find((t) => t.id === match.homeId);
    const away = state.teams.find((t) => t.id === match.awayId);

    home.goalsFor += homeGoals;
    home.goalsAgainst += awayGoals;
    away.goalsFor += awayGoals;
    away.goalsAgainst += homeGoals;

    if (homeGoals > awayGoals) home.points += 3;
    else if (homeGoals < awayGoals) away.points += 3;
    else {
      home.points += 1;
      away.points += 1;
    }
  });

  state.currentWeek++;
},

    resetLeague: () => initialState,
  },
});

export const { startLeague, playCurrentWeek, resetLeague } = matchSlice.actions;
export default matchSlice.reducer;
