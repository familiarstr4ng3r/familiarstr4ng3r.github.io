// const svg = document.querySelector("svg");

const groups = document.querySelectorAll("svg g");

const state = new Array(groups.length).fill(false);

Array.from(groups).forEach((g, index) => {
  g.addEventListener("click", event => {
    const rect = g.querySelector("rect");
    state[index] = !state[index];
    const color = state[index] ? "green" : "red";
    rect.setAttribute("fill", color);
    //console.log(g.textContent.trim());
  });
});