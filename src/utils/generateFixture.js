

export function generateFixture(teams) {
  const originalTeams = [...teams];
  const isOdd = originalTeams.length % 2 !== 0;

  if (isOdd) {
    originalTeams.push({ id: "bay", name: "BAY" });
  }

  const totalTeams = originalTeams.length;
  const totalWeeks = totalTeams - 1;
  const half = totalTeams / 2;
  const rotated = originalTeams.slice();

  const fixture = [];

  for (let week = 0; week < totalWeeks; week++) {
    const matches = [];

    for (let i = 0; i < half; i++) {
      const home = rotated[i];
      const away = rotated[totalTeams - 1 - i];

      if (home.id === away.id) continue;

      if (home.id === "bay" || away.id === "bay") continue;

      matches.push({
        homeId: home.id,
        awayId: away.id,
        homeGoals: null,
        awayGoals: null
      });
    }

    fixture.push(matches);

    const fixed = rotated[0];
    const rest = rotated.slice(1);
    rest.unshift(rest.pop());
    rotated.splice(0, totalTeams, fixed, ...rest);
  }

  return fixture;
}
