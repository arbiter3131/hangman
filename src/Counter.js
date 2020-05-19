import React from "react";
import PropTypes from "prop-types";

import "./Counter.css";

const Counter = ({ attempts }) => <div className="attempts">{attempts}</div>;

Counter.propTypes = {
  attempts: PropTypes.number.isRequired,
};

export default Counter;
