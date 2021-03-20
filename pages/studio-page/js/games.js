
main();

async function main() {

  const response = await fetch("json/games.json");
  if (response.ok) {
    const games = await response.json();
    onGamesFetched(games);
  }
  else {
    onGamesFetchedError();
  }
}
