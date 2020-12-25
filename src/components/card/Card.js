import React from "react";
import PropTypes from "prop-types";

import css from "./Card.module.css";

export const Card = (props) => {
  const { isActive, children } = props;

  const classes = isActive ? `${css.Card} ${css.Active}` : css.Card;

  return (
    <div className={classes}>
      <div className={css.Container}>{children}</div>
    </div>
  );
};

Card.propTypes = {
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
