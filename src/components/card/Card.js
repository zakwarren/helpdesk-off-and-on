import React from "react";
import PropTypes from "prop-types";

import css from "./Card.module.css";

export const Card = (props) => {
  const { isEnabled, isActive, onClick, children } = props;

  let classes = [css.Card];
  if (isEnabled) {
    classes.push(css.Enabled);
  }
  if (isActive) {
    classes.push(css.Active);
  }

  return (
    <div className={classes.join(" ")} onClick={onClick}>
      <div className={css.Container}>{children}</div>
    </div>
  );
};

Card.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
