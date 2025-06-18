import { createSlice } from '@reduxjs/toolkit';

// Uygulama ilk açıldığında takım listesi boştur.
// Takımlar kullanıcı tarafından form ile eklenecektir.
const initialState = [];

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    // Yeni takım eklemek için kullanılır.
    // Eklenen takımın puanı, averajı ve attığı gol başlangıçta 0'dır.
    addTeam: (state, action) => {
      state.push({
        ...action.payload, // id, name, color1, color2
        points: 0,
        goalsFor: 0,
        goalDifference: 0,
      });
    },

    // Tüm takımları sıfırlar.
    // Oyun baştan başlatıldığında kullanılabilir.
    resetTeams: () => {
      return [];
    },

    // Bu reducer, bir maç sonucuna göre iki takımın istatistiklerini günceller.
    updateStats: (state, action) => {
      const { homeId, awayId, homeGoals, awayGoals } = action.payload;

      const homeTeam = state.find((t) => t.id === homeId);
      const awayTeam = state.find((t) => t.id === awayId);

      // Gol sayıları ekleniyor
      homeTeam.goalsFor += homeGoals;
      awayTeam.goalsFor += awayGoals;

      // Averaj (gol farkı) güncelleniyor
      homeTeam.goalDifference += homeGoals - awayGoals;
      awayTeam.goalDifference += awayGoals - homeGoals;

      // Puanlar:
      if (homeGoals > awayGoals) {
        homeTeam.points += 3; // ev sahibi kazandı
      } else if (awayGoals > homeGoals) {
        awayTeam.points += 3; // deplasman kazandı
      } else {
        homeTeam.points += 1; // beraberlik
        awayTeam.points += 1;
      }
    },
  },
});

// Reducer fonksiyonlarımızı dışa aktarıyoruz ki bileşenlerde kullanabilelim
export const { addTeam, resetTeams, updateStats } = teamSlice.actions;

// Bu slice'ın reducer fonksiyonu, store'a tanıtılmak üzere dışa aktarılıyor
export default teamSlice.reducer;
 