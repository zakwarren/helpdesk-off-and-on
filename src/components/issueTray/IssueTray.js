import React from "react";
import PropTypes from "prop-types";

import css from "./IssueTray.module.css";
import { Card } from "../card/Card";

export const IssueTray = ({ tickets, isEnabled, selectedTicket, onClick }) => (
  <section className={css.IssueTray}>
    {tickets.map((ticket) => (
      <Card
        key={ticket.id}
        isEnabled={isEnabled}
        isActive={ticket.id === selectedTicket?.id}
        onClick={() => onClick(ticket)}
      >
        <div className={css.Issue}>
          <span className={css.Type}>{ticket.issueType}</span>
          <h4>{ticket.customer}</h4>
          <p>"{ticket.issue}"</p>
        </div>
      </Card>
    ))}
  </section>
);

IssueTray.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      customer: PropTypes.string.isRequired,
      issueType: PropTypes.string.isRequired,
      issue: PropTypes.string.isRequired,
      experience: PropTypes.number.isRequired,
      patience: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectedTicket: PropTypes.exact({
    id: PropTypes.number.isRequired,
    customer: PropTypes.string.isRequired,
    issueType: PropTypes.string.isRequired,
    issue: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    patience: PropTypes.number.isRequired,
  }),
  isEnabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
