const btn = document.querySelector('.form__btn');

const years = document.querySelector('.years .dashes');
const months = document.querySelector('.months .dashes');
const days = document.querySelector('.days .dashes');

const dayLabel = document.getElementById('dayLabel');
const monthLabel = document.getElementById('monthLabel');
const yearLabel = document.getElementById('yearLabel');

const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

const dayError = document.getElementById('dayError');
const monthError = document.getElementById('monthError');
const yearError = document.getElementById('yearError');

btn.addEventListener('click', (e) => {
  e.preventDefault();

  if (!validInput()) {
    years.textContent = '- -';
    months.textContent = '- -';
    days.textContent = '- -';
    return;
  }

  const birthdate = {
    year: this.year.value,
    month: this.month.value - 1,
    day: this.day.value,
  };

  // add leading zero to 1-digit month or day in UI
  this.month.value = this.month.value.toString().padStart(2, '0');
  this.day.value = this.day.value.toString().padStart(2, '0');

  const diff = calAge(birthdate);

  years.textContent = diff.inYears;
  months.textContent = diff.inMonths;
  days.textContent = diff.inDays;
});

function validInput() {
  const inputs = [dayInput, monthInput, yearInput];

  let valid = true;

  inputs.forEach((input) => {
    const parent = input.parentElement;

    if (!input.value) {
      parent.children[2].innerHTML = 'This field is required';
      addErrorStyles(...parent.children);
      valid = false;
    } else {
      parent.children[2].innerHTML = '';
      removeErrorStyles(...parent.children);
    }
  });

  if (
    !moment(
      `${yearInput.value}-${monthInput.value}-${dayInput.value}`,
      'YYYY-MM-DD'
    ).isValid()
  ) {
    dayError.innerHTML = 'Must be a valid date';
    addErrorStyles(dayLabel, dayInput, dayError);
    valid = false;
  }

  if (yearInput.value > moment().year()) {
    yearError.innerHTML = 'Must be in the past';
    addErrorStyles(yearLabel, yearInput, yearError);
    valid = false;
  }

  if (monthInput.value < 1 || monthInput.value > 12) {
    monthError.innerHTML = 'Must be a valid month';
    addErrorStyles(monthLabel, monthInput, monthError);
    valid = false;
  }

  if (dayInput.value < 1 || dayInput.value > 31) {
    dayError.innerHTML = 'Must be a valid day';
    addErrorStyles(dayLabel, dayInput, dayError);
    valid = false;
  }

  return valid;
}

function addErrorStyles(label, input, error) {
  label.classList.add('error-input-label');
  input.classList.add('error-input-border');
  error.classList.add('error-input-content');
}

function removeErrorStyles(label, input, error) {
  label.classList.remove('error-input-label');
  input.classList.remove('error-input-border');
  error.classList.remove('error-input-content');
}

function calAge(birthdate) {
  let { year, month = month, day } = birthdate;
  let inputDate = moment(`${year}-${month + 1}-${day}`, 'YYYY-MM-DD');
  let age = moment.duration(moment().diff(inputDate));

  return {
    inYears: age.years(),
    inMonths: age.months(),
    inDays: age.days(),
  };
}
