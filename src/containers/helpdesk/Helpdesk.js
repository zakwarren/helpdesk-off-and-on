import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import css from "./Helpdesk.module.css";
import * as actions from "../../store/actions";
import { useOpenTicket, useOptions } from "../../hooks";
import { STAGES, DAY_LENGTH } from "../../shared/config";
import { IssueTray } from "../../components";

export const Helpdesk = (props) => {
  const {
    skills,
    charisma,
    chanceDisaster,
    openTickets,
    selectedTicket,
    message,
    onAddExperience,
    onSelectTicket,
    onCloseTicket,
    onFailTicket,
    onDisaster,
    onFailAllOpen,
    onEndDay,
  } = props;

  useOpenTicket();
  const options = useOptions(selectedTicket?.issueType);

  useEffect(() => {
    const day = setTimeout(() => {
      onFailAllOpen();
      onEndDay();
    }, DAY_LENGTH);
    return () => clearTimeout(day);
  }, [onFailAllOpen, onEndDay]);

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
              } else if (Math.floor(Math.random() * 100) < chanceDisaster) {
                onDisaster(selectedTicket);
              } else {
                const halfExp = Math.floor(selectedTicket.experience / 2);
                onAddExperience(halfExp);
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
        {optionBtns ? optionBtns : message && <p>{message}</p>}
      </section>
    </>
  );
};

Helpdesk.propTypes = {
  skills: PropTypes.object.isRequired,
  charisma: PropTypes.number.isRequired,
  chanceDisaster: PropTypes.number.isRequired,
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
  message: PropTypes.string,
  onAddExperience: PropTypes.func.isRequired,
  onSelectTicket: PropTypes.func.isRequired,
  onCloseTicket: PropTypes.func.isRequired,
  onFailTicket: PropTypes.func.isRequired,
  onDisaster: PropTypes.func.isRequired,
  onFailAllOpen: PropTypes.func.isRequired,
  onEndDay: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => {
  return {
    skills: state.player.skills,
    charisma: state.player.charisma,
    chanceDisaster: state.player.chanceDisaster,
    openTickets: state.game.openTickets,
    selectedTicket: state.game.selectedTicket,
    message: state.game.message,
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
    onDisaster: (ticket) => dispatch(actions.disasterTicket(ticket)),
    onFailAllOpen: () => dispatch(actions.failAllOpenTickets()),
    onEndDay: () => dispatch(actions.setStage(STAGES.review)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Helpdesk);
