const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId;
stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function createBackground() {
  const colorCode = getRandomHexColor();
  document.body.style.background = colorCode;
}

function changeBackground() {
  intervalId = setInterval(createBackground, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopChangeBackground() {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

startBtn.addEventListener('click', changeBackground);
stopBtn.addEventListener('click', stopChangeBackground);