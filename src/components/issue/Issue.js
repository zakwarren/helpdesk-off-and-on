import React from "react";
import PropTypes from "prop-types";

import css from "./Issue.module.css";
import { Card } from "../card/Card";

export const Issue = ({
  isEnabled,
  isActive,
  customer,
  issueType,
  issue,
  onClick,
}) => (
  <Card {...{ isEnabled, isActive, onClick }}>
    <div className={css.Issue}>
      <span className={css.Type}>{issueType}</span>
      <h4>{customer}</h4>
      <p>"{issue}"</p>
    </div>
  </Card>
);

Issue.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  customer: PropTypes.string.isRequired,
  issueType: PropTypes.string.isRequired,
  issue: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
