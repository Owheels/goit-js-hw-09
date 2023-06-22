import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateSelect = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
const timer = document.querySelector('.timer');
const fields = document.querySelectorAll('.field');
const values = document.querySelectorAll('.value');

// Стилі

const container = document.createElement('div');
container.style.display = 'flex';
container.style.gap = '20px';
container.style.justifyContent = 'center';
container.style.marginBottom = '20px';
container.appendChild(dateSelect);
container.appendChild(startBtn);
timer.insertAdjacentElement('beforebegin', container);

timer.style.display = 'flex';
timer.style.justifyContent = 'center';

fields.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
  field.style.margin = '10px';
});

values.forEach(value => {
  value.style.fontSize = '45px';
});

startBtn.disabled = true;

// Таймер

let selectedDate;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDates[0] > new Date()) {
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
    }
  },
};

flatpickr(dateSelect, options);

startBtn.addEventListener('click', updateTimer);

function startTimer() {
  const ms = selectedDate - new Date();
  const timeValue = convertMs(ms);
  updateTimerElements(timeValue);
  if (ms < 1000) {
    clearInterval(intervalId);
  }
  console.log(timeValue);
}

function updateTimer() {
  intervalId = setInterval(startTimer, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerElements(timeValue) {
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  daysElement.textContent = timeValue.days.toString().padStart(2, '0');
  hoursElement.textContent = timeValue.hours.toString().padStart(2, '0');
  minutesElement.textContent = timeValue.minutes.toString().padStart(2, '0');
  secondsElement.textContent = timeValue.seconds.toString().padStart(2, '0');
}
