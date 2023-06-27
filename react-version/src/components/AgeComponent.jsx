const AgeComponent = ({ years = '- -', months = '- -', days = '- -' }) => {
  return (
    <div className="outputs">
      <p className="years">
        <span className="dashes">{years}</span> years
      </p>
      <p className="months">
        <span className="dashes">{months}</span> months
      </p>
      <p className="days">
        <span className="dashes">{days}</span> days
      </p>
    </div>
  );
};

export default AgeComponent;
