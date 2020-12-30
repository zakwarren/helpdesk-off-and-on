import React from "react";
import PropTypes from "prop-types";

const Text = (props) => {
  const { step, username, manager } = props;

  if (step === 1 && manager === "Lukasz") {
    return (
      <>
        <p>
          Good to meet you {username}. I'm {manager} and I'll be your manager
          here. I'm sure you'll do great.
        </p>
        <p>
          Would you like a full induction or would you prefer to get started
          straight away?
        </p>
      </>
    );
  } else if (step === 1 && manager === "Alice") {
    return (
      <>
        <p>
          What's going on here? Oh, the newbie, {username}, right. Good. I'm{" "}
          {manager} and I'm your manager here. You'll do.
        </p>
        <p>
          I can give you a few tips to get you started but I haven't got long.
          Or you can be a good chap and get started straight away?
        </p>
      </>
    );
  } else if (step === 1 && manager === "Matt") {
    return (
      <>
        <p>
          You're here at last, are you? Hmm, I was hoping for... better. What
          was your name again? {username}, whatever. It doesn't matter anyway.
          What does matter is me. I'm {manager} and you'll do exactly as I
          command.
        </p>
        <p>
          Now can you handle a few tickets or do you need me to babysit you?
        </p>
      </>
    );
  } else if (step === 2 && manager === "Lukasz") {
    return <p>Well no time to waste. The helpdesk awaits you!</p>;
  } else if (step === 2 && manager === "Alice") {
    return <p>Right, let's get going then!</p>;
  } else if (step === 2 && manager === "Matt") {
    return <p>Hurry up. What are you waiting for?</p>;
  }

  return null;
};

Text.propTypes = {
  step: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  manager: PropTypes.string.isRequired,
};

export default Text;
