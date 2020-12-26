import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import css from "./Helpdesk.module.css";
import { Issue } from "../../components";

export const Helpdesk = (props) => {
  const {
    allOptions,
    openTickets,
    closedTickets,
    selectedTicket,
    onOpenTicket,
    onSelectTicket,
    onCloseTicket,
  } = props;

  if (openTickets.length === 0) {
    onOpenTicket();
  }

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
        {closedTickets.map((ticket) => (
          <Issue
            key={ticket.id}
            isEnabled={false}
            isActive={false}
            {...ticket}
            onClick={() => {}}
          />
        ))}
        {openTickets.map((ticket) => (
          <Issue
            key={ticket.id}
            isEnabled
            isActive={ticket.id === selectedTicket?.id}
            {...ticket}
            onClick={() => onSelectTicket(ticket)}
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
  onOpenTicket: PropTypes.func.isRequired,
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
    onOpenTicket: () => dispatch(actions.openRandomTicket()),
    onSelectTicket: (ticket) => dispatch(actions.setSelectedTicket(ticket)),
    onCloseTicket: (ticket) => dispatch(actions.closeTicket(ticket)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Helpdesk);
