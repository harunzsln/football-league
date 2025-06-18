// Bu fonksiyon takımların round-robin formatında tüm eşleşmelerini üretir.
// Her hafta tüm takımlar bir kez oynar, her takım birbiriyle 1 kez eşleşir.
// Takım sayısı tekse bir "Bay" (boş) takım eklenir.

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
