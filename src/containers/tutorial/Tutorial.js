import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import css from "./Tutorial.module.css";
import * as actions from "../../store/actions";
import { STAGES } from "../../shared/config";
import { IssueTray } from "../../components";
import Text from "./text/Text";

const ticket1 = {
  id: 1,
  customer: "Roger",
  issueType: "password",
  issue: "I've forgotten my password",
  experience: 5,
  patience: 100,
};
const ticket2 = {
  id: 2,
  customer: "Caroline",
  issueType: "password",
  issue: "I've lost my password!",
  experience: 5,
  patience: 96,
};
const ticket3 = {
  id: 2,
  customer: "Mandy",
  issueType: "password",
  issue: "My screen is blank. Can you fix it?",
  experience: 5,
  patience: 96,
};

export const Tutorial = (props) => {
  const { username, manager, chanceDisaster, onToHelpdesk } = props;
  const [step, setStep] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState(null);

  let render = null;
  let openTickets = [];
  let onSelectTicket = () => {};

  switch (step) {
    case 0:
      render = (
        <>
          <Text
            {...{ step, username, chanceDisaster, manager }}
            ticket={ticket1}
          />
          <button onClick={() => setStep(1)}>Next</button>
        </>
      );
      break;
    case 1:
      openTickets.push(ticket1);
      onSelectTicket = (ticket) => {
        setSelectedTicket(ticket);
        setStep(2);
      };
      render = (
        <Text
          {...{ step, username, chanceDisaster, manager }}
          ticket={ticket1}
        />
      );
      break;
    case 2:
      openTickets.push(ticket1);
      onSelectTicket = () => {};
      render = (
        <>
          <Text
            {...{ step, username, chanceDisaster, manager }}
            ticket={ticket1}
          />
          <button onClick={() => setStep(3)}>
            Try turning it off and on again
          </button>
          <button onClick={() => setStep(3)}>Reset Password</button>
          <button onClick={() => setStep(3)}>Reset Account</button>
          <button onClick={() => setStep(3)}>Use Admin Powers</button>
        </>
      );
      break;
    case 3:
      render = (
        <>
          <Text
            {...{ step, username, chanceDisaster, manager }}
            ticket={ticket1}
          />
          <button onClick={() => setStep(4)}>Next</button>
        </>
      );
      break;
    case 4:
      openTickets.push(ticket2);
      onSelectTicket = (ticket) => {
        setSelectedTicket(ticket);
        setStep(5);
      };
      render = (
        <Text
          {...{ step, username, chanceDisaster, manager }}
          ticket={ticket1}
        />
      );
      break;
    case 5:
      openTickets.push(ticket2);
      onSelectTicket = () => {};
      const toStep6 = () => {
        setStep(6);
        setSelectedTicket(null);
      };
      render = (
        <>
          <button onClick={toStep6}>Try turning it off and on again</button>
          <button onClick={toStep6}>Reset Password</button>
          <button onClick={toStep6}>Reset Account</button>
          <button onClick={toStep6}>Use Admin Powers</button>
        </>
      );
      break;
    case 6:
      openTickets.push(ticket2);
      render = (
        <>
          <Text
            {...{ step, username, chanceDisaster, manager }}
            ticket={ticket2}
          />
          <button onClick={() => setStep(7)}>Next</button>
        </>
      );
      break;
    case 7:
      openTickets.push(ticket2);
      onSelectTicket = (ticket) => {
        setSelectedTicket(ticket);
        setStep(8);
      };
      render = (
        <Text
          {...{ step, username, chanceDisaster, manager }}
          ticket={ticket2}
        />
      );
      break;
    case 8:
      openTickets.push(ticket2);
      onSelectTicket = () => {};
      render = (
        <>
          <button onClick={() => setStep(9)}>
            Try turning it off and on again
          </button>
          <button onClick={() => setStep(9)}>Reset Password</button>
          <button onClick={() => setStep(9)}>Reset Account</button>
          <button onClick={() => setStep(9)}>Use Admin Powers</button>
        </>
      );
      break;
    case 9:
      render = (
        <>
          <Text
            {...{ step, username, chanceDisaster, manager }}
            ticket={ticket2}
          />
          <button onClick={() => setStep(10)}>Next</button>
        </>
      );
      break;
    case 10:
      openTickets.push(ticket3);
      onSelectTicket = (ticket) => {
        setSelectedTicket(ticket);
        setStep(11);
      };
      break;
    case 11:
      openTickets.push(ticket3);
      onSelectTicket = () => {};
      render = (
        <>
          <button onClick={() => setStep(12)}>
            Try turning it off and on again
          </button>
          <button onClick={() => setStep(12)}>Open Up Machine</button>
          <button onClick={() => setStep(12)}>Fix Wiring</button>
          <button onClick={() => setStep(12)}>Hit It With A Wrench</button>
        </>
      );
      break;
    case 12:
      render = (
        <>
          <Text
            {...{ step, username, chanceDisaster, manager }}
            ticket={ticket3}
          />
          <button onClick={() => setStep(13)}>Next</button>
        </>
      );
      break;
    case 13:
      render = (
        <>
          <Text
            {...{ step, username, chanceDisaster, manager }}
            ticket={ticket3}
          />
          <button onClick={onToHelpdesk}>Begin</button>
        </>
      );
      break;
    default:
      break;
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
        <h3>{manager}:</h3>
        {render}
      </section>
    </>
  );
};

Tutorial.propTypes = {
  username: PropTypes.string.isRequired,
  manager: PropTypes.string.isRequired,
  chanceDisaster: PropTypes.number.isRequired,
  onToHelpdesk: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => {
  return {
    username: state.player.username,
    manager: state.player.manager,
    chanceDisaster: state.player.chanceDisaster,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onToHelpdesk: () => dispatch(actions.setStage(STAGES.helpdesk)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
