import PropTypes from "prop-types";

const Icon = ({ name, size = "medium" }) => {
  return <i className={`icon icon--${size} icon--${name}`}></i>;
};

Icon.propTypes = {
  name: PropTypes.oneOf([
    "arrow-left",
    "arrow-right",
    "arrow-up",
    "arrow-down",
    "arrow-up-right",
    "arrow-down-right",
  ]),
};

Icon.defaultProps = {
  name: "icon",
};

export default Icon;
export { Icon };
