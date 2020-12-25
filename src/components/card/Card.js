import React from "react";
import PropTypes from "prop-types";

import css from "./Card.module.css";

export const Card = ({ children }) => (
  <div className={css.Card}>
    <div className={css.Container}>{children}</div>
  </div>
);

Card.propTypes = {
  children: PropTypes.element.isRequired,
};
