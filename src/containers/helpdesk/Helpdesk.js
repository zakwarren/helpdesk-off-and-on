import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import css from "./Helpdesk.module.css";
import * as actions from "../../store/actions";
import { useOpenTicket } from "../../hooks";
import { Issue } from "../../components";

export const Helpdesk = (props) => {
  const {
    allOptions,
    openTickets,
    closedTickets,
    selectedTicket,
    onSelectTicket,
    onCloseTicket,
  } = props;

  useOpenTicket();

  let optionBtns = null;
  if (selectedTicket) {
    const shuffledOpts = allOptions[selectedTicket.issueType].sort(
      () => 0.5 - Math.random()
    );
    const options = shuffledOpts.slice(0, 4);
    optionBtns = (
      <div className={css.OptionBtns}>
        {options.map((opt, index) => (
          <button key={index} onClick={() => onCloseTicket(selectedTicket)}>
            {opt}
          </button>
        ))}
      </div>
    );
  }

  return (
    <>
      <section className={css.IssueTray}>
        {openTickets.map((ticket) => (
          <Issue
            key={ticket.id}
            isEnabled
            isActive={ticket.id === selectedTicket?.id}
            {...ticket}
            onClick={() => onSelectTicket(ticket)}
          />
        ))}
        {closedTickets.map((ticket) => (
          <Issue
            key={ticket.id}
            isEnabled={false}
            isActive={false}
            {...ticket}
            onClick={() => {}}
          />
        ))}
      </section>
      <section className={css.Controls}>
        <h3>Options</h3>
        {optionBtns}
      </section>
    </>
  );
};

Helpdesk.propTypes = {
  allOptions: PropTypes.object,
  closedTickets: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      customer: PropTypes.string.isRequired,
      issueType: PropTypes.string.isRequired,
      issue: PropTypes.string.isRequired,
    })
  ).isRequired,
  openTickets: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      customer: PropTypes.string.isRequired,
      issueType: PropTypes.string.isRequired,
      issue: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedTicket: PropTypes.exact({
    id: PropTypes.number.isRequired,
    customer: PropTypes.string.isRequired,
    issueType: PropTypes.string.isRequired,
    issue: PropTypes.string.isRequired,
  }),
  onSelectTicket: PropTypes.func.isRequired,
  onCloseTicket: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => {
  return {
    allOptions: state.game.allOptions,
    closedTickets: state.game.closedTickets,
    openTickets: state.game.openTickets,
    selectedTicket: state.game.selectedTicket,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onSelectTicket: (ticket) => dispatch(actions.setSelectedTicket(ticket)),
    onCloseTicket: (ticket) => dispatch(actions.closeTicket(ticket)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Helpdesk);
