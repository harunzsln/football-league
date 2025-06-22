

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
