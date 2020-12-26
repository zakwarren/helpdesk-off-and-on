import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import css from "./Helpdesk.module.css";
import * as actions from "../../store/actions";
import { useOpenTicket, useOptions } from "../../hooks";
import { Issue } from "../../components";

export const Helpdesk = (props) => {
  const {
    skills,
    openTickets,
    closedTickets,
    selectedTicket,
    onAddExperience,
    onSelectTicket,
    onCloseTicket,
  } = props;

  useOpenTicket();
  const options = useOptions(selectedTicket?.issueType);

  let optionBtns = null;
  if (selectedTicket) {
    const skill = skills[selectedTicket.issueType];

    optionBtns = (
      <div className={css.OptionBtns}>
        {options.map((opt, index) => (
          <button
            key={index}
            onClick={() => {
              if (skill > opt.difficulty) {
                onAddExperience(10);
                onCloseTicket(selectedTicket);
              } else {
                onSelectTicket(null);
              }
            }}
          >
            {opt.text}
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
  skills: PropTypes.object.isRequired,
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
  onAddExperience: PropTypes.func.isRequired,
  onSelectTicket: PropTypes.func.isRequired,
  onCloseTicket: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => {
  return {
    skills: state.player.skills,
    closedTickets: state.game.closedTickets,
    openTickets: state.game.openTickets,
    selectedTicket: state.game.selectedTicket,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onAddExperience: (experience) =>
      dispatch(actions.addExperience(experience)),
    onSelectTicket: (ticket) => dispatch(actions.setSelectedTicket(ticket)),
    onCloseTicket: (ticket) => dispatch(actions.closeTicket(ticket)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Helpdesk);
