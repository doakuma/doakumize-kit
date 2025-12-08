import PropTypes from "prop-types";
import "./ShowcaseActionPanel.css";

export const ShowcaseActionPanel = ({ title, payload, onClear }) => {
  if (!payload) {
    return null;
  }

  return (
    <div className="showcase-action-panel">
      <div className="showcase-action-panel__header">
        <span className="showcase-action-panel__title">{title}</span>
        {onClear && (
          <button
            type="button"
            className="showcase-action-panel__clear"
            onClick={onClear}
          >
            Clear
          </button>
        )}
      </div>
      <pre className="showcase-action-panel__body">
        {JSON.stringify(payload, null, 2)}
      </pre>
    </div>
  );
};

ShowcaseActionPanel.propTypes = {
  title: PropTypes.string.isRequired,
  payload: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onClear: PropTypes.func,
};

ShowcaseActionPanel.defaultProps = {
  payload: null,
  onClear: undefined,
};

export default ShowcaseActionPanel;
