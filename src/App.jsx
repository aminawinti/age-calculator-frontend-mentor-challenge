import { useState } from 'react';
import moment from 'moment';

import './index.css';
import FormComponent from './components/FormComponent';
import AgeComponent from './components/AgeComponent';
import { Footer } from './components/Footer';

const ERRORS = {
  required: 'This field is required',
  invalid: {
    year: 'Must be in the past',
    month: 'Must be a valid month',
    day: 'Must be a valid day',
    date: 'Must be a valid date',
  },
};

function App() {
  const [age, setAge] = useState({ year: null, month: null, day: null });
  const [yearError, setYearError] = useState('');
  const [monthError, setMonthError] = useState('');
  const [dayError, setDayError] = useState('');

  let valid = true;

  function resetErrors() {
    setYearError('');
    setMonthError('');
    setDayError('');
  }

  function showRequiredFieldsErrors(year, month, day) {
    setYearError(!year ? ERRORS.required : '');
    setMonthError(!month ? ERRORS.required : '');
    setDayError(!day ? ERRORS.required : '');
    valid = false;
  }

  function hideDateError() {
    if (!dayError || dayError === ERRORS.invalid.date) setDayError('');
  }

  function checkDateValidity(year, month, day) {
    if (!moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').isValid()) {
      setDayError(ERRORS.invalid.date);
      valid = false;
    }
    valid = true;
  }

  function checkYearValidity(year) {
    if (year > moment().year()) {
      setYearError(ERRORS.invalid.year);
      hideDateError();
      valid = false;
    }
    valid = true;
  }

  function checkMonthValidity(month) {
    if (month < 1 || month > 12) {
      setMonthError(ERRORS.invalid.month);
      hideDateError();
      valid = false;
    }
    valid = true;
  }

  function checkDayValidity(day) {
    if (day < 1 || day > 31) {
      setDayError(ERRORS.invalid.day);
      valid = false;
    }
    valid = true;
  }

  function calAge(birthdate) {
    let { year, month, day } = birthdate;

    if (!year || !month || !day) showRequiredFieldsErrors(year, month, day);
    else {
      year = parseInt(year, 10);
      month = parseInt(month, 10);
      day = parseInt(day, 10);

      resetErrors();

      checkDateValidity(year, month, day);
      checkYearValidity(year);
      checkMonthValidity(month);
      checkDayValidity(day);

      let ageResult;

      if (valid) {
        const ageFormat = moment(`${year}-${month + 1}-${day}`, 'YYYY-MM-DD');
        ageResult = moment.duration(moment().diff(ageFormat));
      }

      setAge({
        year: valid ? ageResult.years() : '- -',
        month: valid ? ageResult.months() + 1 : '- -',
        day: valid ? ageResult.days() : '- -',
      });
    }
  }

  return (
    <div className="app-container">
      <FormComponent
        onAddDate={(date) => calAge(date)}
        dayError={dayError}
        yearError={yearError}
        monthError={monthError}
      />
      <AgeComponent
        years={age.year || '- -'}
        months={age.month || '- -'}
        days={age.day || '- -'}
      />
      <Footer />
    </div>
  );
}

export default App;
