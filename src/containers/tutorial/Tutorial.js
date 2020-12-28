import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import css from "./Tutorial.module.css";
import * as actions from "../../store/actions";
import { STAGES } from "../../shared/config";
import { IssueTray } from "../../components";

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
          <p>
            Welcome to the Helpdesk, {username}. I hope you've had your bacon
            sandwiches this morning. It's time to get started.
          </p>
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
        <>
          <p>
            Oh what good timing! A customer has arrived. Let's find out what
            they need.
          </p>
          <p>First select them from the queue.</p>
        </>
      );
      break;
    case 2:
      openTickets.push(ticket1);
      onSelectTicket = () => {};
      render = (
        <>
          <p>
            {ticket1.customer} has an issue with their {ticket1.issueType}. This
            is an easy one to solve. Take a look at your options below. Click
            one to make your choice.
          </p>
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
          <p>
            Congratulations! You've successfully helped this customer. You've
            earned {ticket1.experience} experience from this helpdesk issue.
            When you achieve enough experience you'll level up. This will
            increase your skills and even unlock new skills.
          </p>
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
        <>
          <p>
            You've got another customer waiting. Select them from the queue to
            find out what they need.
          </p>
        </>
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
      const halfExp = Math.floor(ticket2.experience / 2);
      render = (
        <>
          <p>
            Failed to solve {ticket2.issueType} issue! Don't worry about that.
            It happens a lot when you're new. Failure is a good opportunity to
            learn. This time you gained {halfExp} experience.
          </p>
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
        <>
          <p>
            Fortunately this customer has {ticket2.patience}% patience. Each
            time you fail their patience will decrease. When it reaches 0
            they'll leave.
          </p>
          <p>Select the ticket to try again.</p>
        </>
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
          <p>
            Congratulations! You've successfully helped {ticket2.customer}.
            You've also earned {ticket2.experience} points.
          </p>
          <p>Let's try helping one more customer together.</p>
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
      render = <></>;
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
          <p>Disaster! You destroyed the hardware!</p>
          <p>
            Oh dear! This can happen occasionally. Your current chance of
            disaster is {chanceDisaster}%. You'll reduce this chance with
            experience.
          </p>
          <button onClick={() => setStep(13)}>Next</button>
        </>
      );
      break;
    case 13:
      render = (
        <>
          <p>
            That's all the induction I had planned for today. You now know
            enough to try it on your own. Good luck!
          </p>
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
