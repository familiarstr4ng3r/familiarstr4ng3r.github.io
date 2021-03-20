

const os = getOS();

let allGames;

main();

function main() {
  operationSystem();
}

function operationSystem() {
  const container = document.querySelector(".container");

  for (const key in os) {
    const p = document.createElement("p");
    container.appendChild(p);
    p.textContent = os[key];
  }
}

function onGamesFetched(games) {
  allGames = games;
  validateURL();
}

function onGamesFetchedError() {
  console.warn("games error");
}

function validateURL() {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has("game")) {
    const game = urlParams.get("game");
    const value = allGames.find(e => e.param === game);
    if (value) proceedGameValue(value);
  }
  else {
    showGames();
  }
}

function proceedGameValue(value) {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.querySelector("h1").textContent = value.name;

  for (const key in value.links) {
    const p = document.createElement("p");
    gameContainer.appendChild(p);
    p.innerHTML = `
    <a href=${value.links[key]} target="_blank">${value.links[key]}</a>
    `;
  }

  if (os.operationSystem === "Android") {
    // window.open(value.links.android);
    window.location.href = value.links.android;
  }
  else if (os.operationSystem === "iOS") {
    // window.open(value.links.ios);
    window.location.href = value.links.ios;
  }
  else if (os.operationSystem === "Windows") {
    // window.open(value.links.android);
    // window.location.href = value.links.android;
    console.log("should be redirect on windows?");
  }
}

function showGames() {
  console.log("show games");

  const gamesContainer = document.querySelector(".games-container");

  allGames.forEach(e => {
    const div = document.createElement("div");
    gamesContainer.appendChild(div);
    div.className = "game";
    const redirect = window.location.href + `?game=${e.param}`;
    div.innerHTML = `
      <span>${e.name}</span>
      <a href="${redirect}">Redirect</a>
    `;

  });
}
