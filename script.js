const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
const startButton = document.getElementById('start');
const currentScoreNumber = document.getElementById('score-number');
const bestScoreNumber = document.getElementById('high-score-number');
const botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
const beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
const spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
const closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';

let currentlyPlaying = true;
let numClosedDoors = 3;
let currentStreak = 0;
let bestStreak = 0;
let openDoor1;
let openDoor2;
let openDoor3;

const isBot = (door) => {
 if (door.src === botDoorPath) {
   return true
 } else {
   return false
 }
}

const isNotClicked = (door) => {
  if (door.src === closedDoorPath) {
    return true;
  } else {
    return false;
  }
}

const playDoor = (door) => {
  numClosedDoors--;
  if(!numClosedDoors) {
    gameOver('win');
  } else if (isBot(door)) {
    gameOver();
  }
}

doorImage1.onclick = () => {
  if (currentlyPlaying && isNotClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
}

doorImage2.onclick = () => {
  if (currentlyPlaying && isNotClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
}

doorImage3.onclick = () => {
  if (currentlyPlaying && isNotClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
}

const startRound = () => {
  doorImage1.src = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
  doorImage2.src = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
  doorImage3.src = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
  numClosedDoors = 3;
  startButton.innerHTML = 'Good Luck!';
  currentlyPlaying = true;

  randomChoreDoorGenerator();
}

startButton.onclick = () => {
  if(!currentlyPlaying) {
    startRound();
  }
}

const gameOver = (status) => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
    
    currentStreak++;
    currentScoreNumber.innerHTML = currentStreak;

    if(currentStreak > bestStreak) {
      bestStreak = currentStreak;
      bestScoreNumber.innerHTML = bestStreak;
    }
  } else {
    startButton.innerHTML = 'Game over! Play again?';
    
    currentStreak = 0;
    currentScoreNumber.innerHTML = currentStreak;
  }

  currentlyPlaying = false;
}

const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor1 = spaceDoorPath;
    openDoor3 = beachDoorPath;
  } else {
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  }
};

startRound();
