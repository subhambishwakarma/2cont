const activeTimers = [];

function startNewTimer() {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (totalSeconds <= 0) {
    alert('Please enter a valid time.');
    return;
  }

  const timer = {
    timeRemaining: totalSeconds,
    interval: setInterval(() => {
      if (timer.timeRemaining <= 0) {
        clearInterval(timer.interval);
        timerComplete(timer);
      } else {
        timer.timeRemaining--;
        updateTimerDisplay(timer);
      }
    }, 1000)
  };

  activeTimers.push(timer);
  updateTimerDisplay(timer);
}

function timerComplete(timer) {
  const timerDiv = document.getElementById('timer-' + timer.timeRemaining);
  if (timerDiv) {
    timerDiv.classList.add('completed');
    timerDiv.innerHTML = '<div class="time-remaining">Timer Complete</div>';
  }

  // Play audio alert here (you can use the Audio object)
  // Example: new Audio('path/to/audio.mp3').play();
}

function updateTimerDisplay(timer) {
  const timerDiv = document.getElementById('timer-' + timer.timeRemaining);
  if (timerDiv) {
    timerDiv.querySelector('.time').innerHTML = formatTime(timer.timeRemaining);
  }
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
