const hitAudioSFX = new Audio('Chicky.wav');
const playHitSFX = () => {
  hitAudioSFX.pause();
  hitAudioSFX.currentTime = 0;
  hitAudioSFX.play();
};

const minDifficultyActorSize = 120;
const maxDifficultyActorSize = Math.min(40, minDifficultyActorSize);
const minDifficultyInterval = 4000;
const maxDifficultyInterval = Math.min(300, minDifficultyInterval);
const difficultyDiff = minDifficultyInterval - maxDifficultyInterval;
const difficultyWindow = 300;
const difficultyMinIncrement = 0.05;
const difficultyMaxIncrement = Math.max(0.1, difficultyMinIncrement);
let difficultyT = 0;

let container = document.querySelector(".container");
let scoreCounter = document.querySelector(".score-counter");
let chicky = document.querySelector(".chicky");

let score = 0;
scoreCounter.textContent = score.toString();

let actorSize = minDifficultyActorSize;
chicky.style.height = chicky.style.width = `${actorSize}px`;

const lerp = (a, b, t) => a + (b - a) * t;

const getInterval = () => {
  const minInterval = minDifficultyInterval - difficultyDiff * difficultyT;
  const maxInterval = Math.min(minInterval + difficultyWindow, minDifficultyInterval);
  return lerp(minInterval, maxInterval, Math.random());
};

const randomizeChickyPosition = () => {
  const maxX = Math.max(container.clientWidth - actorSize, actorSize);
  chicky.style.left = `${maxX * Math.random()}px`;

  const maxY = Math.max(container.clientHeight - actorSize, actorSize);
  chicky.style.top = `${maxY * Math.random()}px`;
};
randomizeChickyPosition();
let randomizeIntervalId = setInterval(randomizeChickyPosition, getInterval());

const onClick = (e) => {
  if (event.cancelable) {
    event.preventDefault();
  }
  
  clearInterval(randomizeIntervalId);
  
  playHitSFX();
  scoreCounter.textContent = (++score).toString();
  
  const difficultyIncrement = lerp(difficultyMinIncrement, difficultyMaxIncrement, Math.random());
  difficultyT = Math.min(difficultyT + difficultyIncrement, 1);
  actorSize = lerp(minDifficultyActorSize, maxDifficultyActorSize, difficultyT);
  chicky.style.height = chicky.style.width = `${actorSize}px`;
  randomizeChickyPosition();
  randomizeIntervalId = setInterval(randomizeChickyPosition, getInterval());
  
  if (score === 15) {
    var uri = "vnd.youtube://www.youtube.com/results?search_query=chicky";
    window.location.href = uri;
  }
};
chicky.addEventListener("mousedown", onClick);
chicky.addEventListener("touchstart", onClick);
