import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="spinner">
      <div className="spinner__loader" aria-label="Loading offers"></div>
    </div>
  );
}

export default Spinner;
