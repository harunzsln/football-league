// Bu fonksiyon takımların round-robin formatında tüm eşleşmelerini üretir.
// Her hafta tüm takımlar bir kez oynar, her takım birbiriyle 1 kez eşleşir.
// Takım sayısı tekse bir "Bay" (boş) takım eklenir.
/*
export const generateFixture = (teams) => {
  const teamCount = teams.length;

  // Eğer takım sayısı tekse "bay" ekleyerek çift yapıyoruz
  const hasBye = teamCount % 2 !== 0;

  // Takımları kopyalayıp üzerine işlem yapacağız
  const teamList = [...teams];

  if (hasBye) {
    // Bay takım = o hafta kimseyle oynamayan takım
    teamList.push({
      id: 'bye',
      name: 'Bay',
      color1: '#ddd',
      color2: '#eee',
    });
  }

  const totalRounds = teamList.length - 1; // kaç hafta oynanacağı
  const halfSize = teamList.length / 2;

  const fixture = [];

  // Takımları döndürmek için ayarlanıyor
  const rotatingTeams = [...teamList];
  const fixedTeam = rotatingTeams.shift(); // ilk takım sabit kalıyor

  // Her hafta için döngü
  for (let round = 0; round < totalRounds; round++) {
    const matches = [];

    for (let i = 0; i < halfSize; i++) {
      const home =
        i === 0 ? fixedTeam : rotatingTeams[i - 1]; // sabit takım ilk eşleşmede ev sahibi
      const away = rotatingTeams[rotatingTeams.length - i - 1];

      // Bay olan eşleşmeleri eklemiyoruz
      if (home.id !== 'bye' && away.id !== 'bye') {
        matches.push({
          homeId: home.id,
          awayId: away.id,
        });
      }
    }

    fixture.push(matches); // Bu haftanın eşleşmelerini listeye ekle

    // Round-robin rotasyonu: takımları döndür
    //rotatingTeams.splice(0, 0, rotatingTeams.pop());
  }

  return fixture;
};
*/

// src/features/matches/generateFixture.js

export function generateFixture(teams) {
  const shuffled = [...teams].sort(() => Math.random() - 0.5); // Karışık
  const fixtures = [];
  const teamCount = shuffled.length;

  for (let week = 0; week < teamCount - 1; week++) {
    const matches = [];
    for (let i = 0; i < teamCount / 2; i++) {
      const home = shuffled[i];
      const away = shuffled[teamCount - 1 - i];
      matches.push({ homeId: home.id, awayId: away.id, homeGoals: null, awayGoals: null });
    }
    fixtures.push(matches);
    shuffled.splice(1, 0, shuffled.pop()); // Döndürme
  }

  return fixtures;
}
