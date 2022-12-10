const items = document.getElementsByClassName("shape");
const body = document.getElementsByClassName("body");
let theme = document.getElementById("theme");

theme.onclick = function () {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    theme.src = "assets/dark.svg";
  } else {
    theme.src = "assets/light.svg";
  }
};
const move = (item, x, y) => {
  item.style.left = `${x}px`;
  item.style.top = `${y}px`;
};

// Logic to check if the shape catches food
const catchFood = (l1, l2, t1, t2) => {
  return l2 >= l1 - 75 && l2 <= l1 + 75 && t2 >= t1 - 12.5 && t2 <= t1 + 12.5;
};

let points = 0;

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const food = document.getElementsByClassName("food")[0];

let leftPx = 80;
let topPx = 50;

food.style.left = `${leftPx}px`;
food.style.top = `${topPx}px`;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function game(e) {
  for (i = 0; i < items.length; i++) {
    move(items[i], e.clientX, e.clientY);
  }

  let collide = catchFood(e.clientX, leftPx, e.clientY, topPx);
  if (collide) {
    leftPx = randomNumber(20, screenWidth - 20);
    topPx = randomNumber(20, screenHeight - 20);
    food.style.left = `${leftPx}px`;
    food.style.top = `${topPx}px`;
    points += 1;
    document.getElementById("points").innerHTML = points;
  }
  requestAnimationFrame(game);
}
window.onmousemove = (e) => {
  game(e);
};

window.touchmove = (e) => {
  game(e);
};
