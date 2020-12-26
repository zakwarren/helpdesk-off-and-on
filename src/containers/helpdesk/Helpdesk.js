import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import css from "./Helpdesk.module.css";
import * as actions from "../../store/actions";
import { useOpenTicket, useOptions } from "../../hooks";
import { DAY_LENGTH } from "../../shared/config";
import { IssueTray } from "../../components";

export const Helpdesk = (props) => {
  const {
    skills,
    charisma,
    openTickets,
    selectedTicket,
    onAddExperience,
    onSelectTicket,
    onCloseTicket,
    onFailTicket,
  } = props;

  useOpenTicket();
  const options = useOptions(selectedTicket?.issueType);

  useEffect(() => {
    const day = setTimeout(() => {
      console.log("Day ending...");
    }, DAY_LENGTH);
    return () => clearTimeout(day);
  }, []);

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
                onAddExperience(selectedTicket.experience);
                onCloseTicket(selectedTicket);
              } else {
                onFailTicket(selectedTicket, charisma);
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
      <IssueTray
        tickets={openTickets}
        isEnabled
        selectedTicket={selectedTicket}
        onClick={onSelectTicket}
      />
      <section className={css.Controls}>
        <h3>Options</h3>
        {optionBtns}
      </section>
    </>
  );
};

Helpdesk.propTypes = {
  skills: PropTypes.object.isRequired,
  charisma: PropTypes.number.isRequired,
  openTickets: PropTypes.arrayOf(
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
  onAddExperience: PropTypes.func.isRequired,
  onSelectTicket: PropTypes.func.isRequired,
  onCloseTicket: PropTypes.func.isRequired,
  onFailTicket: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => {
  return {
    skills: state.player.skills,
    charisma: state.player.charisma,
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
    onFailTicket: (ticket, charisma) =>
      dispatch(actions.failTicket(ticket, charisma)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Helpdesk);
