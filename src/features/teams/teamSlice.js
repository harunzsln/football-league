// src/features/teams/teamSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const teamSlice = createSlice({
  name: 'teams',
  initialState: [],
  reducers: {
    addTeam: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare({ name, primaryColor, secondaryColor }) {
        return {
          payload: {
            id: nanoid(),
            name,
            primaryColor,
            secondaryColor,
            points: 0,
            goalsFor: 0,
            goalsAgainst: 0,
          },
        };
      },
    },
    resetTeams: () => [],
  },
});

export const { addTeam, resetTeams } = teamSlice.actions;
export default teamSlice.reducer;
