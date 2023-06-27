import { useState } from 'react';

const FormComponent = ({ yearError, monthError, dayError, onAddDate }) => {
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  let hasError = yearError || monthError || dayError;

  function handleSubmit(e) {
    e.preventDefault();

    const birthDate = {
      year,
      month: month,
      day: day,
    };

    onAddDate(birthDate);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputs">
        <div className="input-container">
          <label
            id="dayLabel"
            htmlFor="day"
            className={`${hasError ? 'error-input-label' : ''}`}
          >
            Day
          </label>
          <input
            type="number"
            name="day"
            id="day"
            placeholder="DD"
            value={day}
            onChange={(e) =>
              setDay(e.target.value.toString().padStart(2, '0').slice(-2))
            }
            className={`${hasError ? 'error-input-border' : ''}`}
          />
          <p
            id="dayError"
            className={`${dayError ? 'error-input-content' : ''}`}
          >
            {dayError}
          </p>
        </div>
        <div className="input-container">
          <label
            id="monthLabel"
            htmlFor="month"
            className={`${hasError ? 'error-input-label' : ''}`}
          >
            Month
          </label>
          <input
            type="number"
            name="month"
            id="month"
            placeholder="MM"
            value={month}
            onChange={(e) =>
              setMonth(e.target.value.toString().padStart(2, '0').slice(-2))
            }
            className={`${hasError ? 'error-input-border' : ''}`}
          />
          <p
            id="monthError"
            className={`${monthError ? 'error-input-content' : ''}`}
          >
            {monthError}
          </p>
        </div>
        <div className="input-container">
          <label
            id="yearLabel"
            htmlFor="year"
            className={`${hasError ? 'error-input-label' : ''}`}
          >
            Year
          </label>
          <input
            type="number"
            name="year"
            id="year"
            placeholder="YYYY"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={`${hasError ? 'error-input-border' : ''}`}
          />
          <p
            id="yearError"
            className={`${yearError ? 'error-input-content' : ''}`}
          >
            {yearError}
          </p>
        </div>
      </div>
      <button className="form__btn">
        <img className="" src="/icon-arrow.svg" alt="arrow" />
      </button>
    </form>
  );
};
export default FormComponent;
