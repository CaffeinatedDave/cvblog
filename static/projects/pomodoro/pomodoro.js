const durations = {
  focus: 20 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

const labels = {
  focus: 'Focus',
  short: 'Short break',
  long: 'Long break',
};

const app = document.querySelector('.pomodoro-app');
const panel = document.querySelector('.pomodoro-panel');
const title = document.querySelector('#pomodoro-title');
const timeDisplay = document.querySelector('.pomodoro-time');
const sessionCounter = document.querySelector('.pomodoro-session-counter');
const statusText = document.querySelector('.pomodoro-status');
const modeButtons = document.querySelectorAll('[data-mode]');
const toggleButton = document.querySelector('[data-action="toggle"]');
const resetButton = document.querySelector('[data-action="reset"]');

if (app && panel && title && timeDisplay && sessionCounter && statusText && toggleButton && resetButton) {
let mode = 'focus';
let remaining = durations[mode];
let intervalId = null;
let completedSessions = 0;
let isComplete = false;
let alarmTimeoutId = null;

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function render() {
  title.textContent = labels[mode];
  timeDisplay.textContent = formatTime(remaining);
  toggleButton.textContent = intervalId ? 'Pause' : 'Start';

  sessionCounter.textContent = '';
  sessionCounter.setAttribute('aria-label', `${completedSessions} focus sessions completed`);

  const dotCount = Math.max(4, completedSessions);
  for (let index = 0; index < dotCount; index += 1) {
    const dot = document.createElement('span');
    dot.className = 'pomodoro-session-dot';
    dot.classList.toggle('is-filled', index < completedSessions);
    sessionCounter.append(dot);
  }

  modeButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.mode === mode);
  });
}

function playAlarmEffect() {
  if (alarmTimeoutId) {
    window.clearTimeout(alarmTimeoutId);
  }

  panel.classList.remove('is-complete');
  window.requestAnimationFrame(() => {
    panel.classList.add('is-complete');
  });

  alarmTimeoutId = window.setTimeout(() => {
    panel.classList.remove('is-complete');
    alarmTimeoutId = null;
  }, 2400);
}

function stopTimer(message, completed = false) {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  if (message) {
    statusText.textContent = message;
  }

  if (completed) {
    isComplete = true;
    remaining = durations[mode];
    playAlarmEffect();

    if (mode === 'focus') {
      completedSessions += 1;
    }

    if (mode === 'long') {
      completedSessions = 0;
    }
  }

  render();
}

function setMode(nextMode) {
  mode = nextMode;
  remaining = durations[mode];
  isComplete = false;
  stopTimer(`${labels[mode]} timer ready.`);
}

function startTimer() {
  if (isComplete) {
    isComplete = false;
  }

  statusText.textContent = `${labels[mode]} timer running.`;
  intervalId = window.setInterval(() => {
    remaining -= 1;

    if (remaining <= 0) {
      remaining = 0;
      stopTimer(`${labels[mode]} complete.`, true);
      return;
    }

    render();
  }, 1000); 

  render();
}

modeButtons.forEach((button) => {
  button.addEventListener('click', () => setMode(button.dataset.mode));
});

toggleButton.addEventListener('click', () => {
  if (intervalId) {
    stopTimer(`${labels[mode]} timer paused.`);
    return;
  }

  startTimer();
});

resetButton.addEventListener('click', () => {
  remaining = durations[mode];
  isComplete = false;
  stopTimer(`${labels[mode]} timer reset.`);
});

render();
}
