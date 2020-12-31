import React from "react";
import PropTypes from "prop-types";

const Text = (props) => {
  const { step, username, chanceDisaster, manager, ticket } = props;
  const halfExp = Math.floor(ticket.experience / 2);

  if (step === 0 && manager === "Lukasz") {
    return (
      <p>
        Welcome to the Helpdesk, {username}. I hope you've had your bacon
        sandwiches this morning. It's time to get started.
      </p>
    );
  } else if (step === 0 && manager === "Alice") {
    return (
      <p>
        So this is where you work, {username}. Look sharp now, there's work to
        be done.
      </p>
    );
  } else if (step === 0 && manager === "Matt") {
    return <p>Hmm disappointing. Hurry up! I haven't got all day.</p>;
  } else if (step === 1 && manager === "Lukasz") {
    return (
      <>
        <p>
          Oh what good timing! A customer has arrived. Let's find out what they
          need.
        </p>
        <p>First select them from the queue.</p>
      </>
    );
  } else if (step === 1 && manager === "Alice") {
    return (
      <p>
        Here's someone who needs help. Something's probably broken. It usually
        is in the world of IT. Select them, would you?
      </p>
    );
  } else if (step === 1 && manager === "Matt") {
    return <p>Some idiot has broken something. Select them.</p>;
  } else if (step === 2 && manager === "Lukasz") {
    return (
      <p>
        {ticket.customer} has an issue with their {ticket.issueType}. This is an
        easy one to solve. Take a look at your options below. Click one to make
        your choice.
      </p>
    );
  } else if (step === 2 && manager === "Alice") {
    return (
      <p>
        What in blazes is their problem? Something to do with {ticket.issueType}
        ? I don't really understand your tappy tappy click clicks. Sort it out{" "}
        {username}!
      </p>
    );
  } else if (step === 2 && manager === "Matt") {
    return (
      <p>Ha! They've messed up their {ticket.issueType}. Fix it, if you can.</p>
    );
  } else if (step === 3 && manager === "Lukasz") {
    return (
      <p>
        Congratulations! You've successfully helped this customer. You've earned{" "}
        {ticket.experience} experience from this helpdesk issue. When you
        achieve enough experience you'll level up. This will increase your
        skills and even unlock new skills.
      </p>
    );
  } else if (step === 3 && manager === "Alice") {
    return (
      <p>
        So you've done, eh? Good work. You've earned yourself those{" "}
        {ticket.experience} experience points. When you collect enough, you can
        join the ranks of those in the next level. You may even learn some new
        skills!
      </p>
    );
  } else if (step === 3 && manager === "Matt") {
    return (
      <p>
        You've actually managed this simple task. I didn't think you had it in
        you. Take those {ticket.experience} experience points. It's more than
        you deserve. Only I am allowed the big points.
      </p>
    );
  } else if (step === 4 && manager === "Lukasz") {
    return (
      <p>
        You've got another customer waiting. Select them from the queue to find
        out what they need.
      </p>
    );
  } else if (step === 4 && manager === "Alice") {
    return (
      <p>
        What are you sitting around for? There's another trouble-maker waiting
        for you. Select them to find out what's going on.
      </p>
    );
  } else if (step === 4 && manager === "Matt") {
    return <p>Here's another idiot. See what they want.</p>;
  } else if (step === 6 && manager === "Lukasz") {
    return (
      <p>
        Failed to solve {ticket.issueType} issue! Don't worry about that. It
        happens a lot when you're new. Failure is a good opportunity to learn.
        This time you gained {halfExp} experience.
      </p>
    );
  } else if (step === 6 && manager === "Alice") {
    return (
      <p>
        Tsk! You've failed with this {ticket.issueType}. No matter. I don't even
        know what's going on. Pick yourself up by your bootstraps and try again.
        You did gain {halfExp} experience after all.
      </p>
    );
  } else if (step === 6 && manager === "Matt") {
    return (
      <p>
        You failure! Why did they even hire you? Whatever. I'm stuck with you
        for now. Try again. You didn't get {halfExp} for laying about.
      </p>
    );
  } else if (step === 7 && manager === "Lukasz") {
    return (
      <>
        <p>
          Fortunately this customer has {ticket.patience}% patience. Each time
          you fail their patience will decrease. When it reaches 0 they'll
          leave.
        </p>
        <p>Select the ticket to try again.</p>
      </>
    );
  } else if (step === 7 && manager === "Alice") {
    return (
      <>
        <p>
          They've got {ticket.patience}% patience anyway, so they can wait. Each
          time you fumble they'll lose patience. When it reaches 0, they'll
          bugger right off.
        </p>
        <p>Select the ticket to give it another go.</p>
      </>
    );
  } else if (step === 7 && manager === "Matt") {
    return (
      <>
        <p>
          For some reason they've got {ticket.patience}% patience, so they're
          going to hang about cluttering up the place. They'll lose patience
          every time you mess up. If it reaches 0, they'll finally leave.
        </p>
        <p>Go again and don't screw it up this time.</p>
      </>
    );
  } else if (step === 9 && manager === "Lukasz") {
    return (
      <>
        <p>
          Congratulations! You've successfully helped {ticket.customer}. You've
          also earned {ticket.experience} points.
        </p>
        <p>Let's try helping one more customer together.</p>
      </>
    );
  } else if (step === 9 && manager === "Alice") {
    return (
      <>
        <p>
          Well you've only gone and rescued the situation! Not bad. Here, take
          your {ticket.experience} points with pride.
        </p>
        <p>I've got time for one more. Let's give it a go.</p>
      </>
    );
  } else if (step === 9 && manager === "Matt") {
    return (
      <>
        <p>
          You've done it, at last. Take the {ticket.experience} points. I know
          you don't deserve them.
        </p>
        <p>
          I'll stay here one more time. Only because your failure amuses me.
        </p>
      </>
    );
  } else if (step === 12 && manager === "Lukasz") {
    return (
      <>
        <p>Disaster! You destroyed the hardware!</p>
        <p>
          Oh dear! This can happen occasionally. Your current chance of disaster
          is {chanceDisaster}%. You'll reduce this chance with experience.
        </p>
      </>
    );
  } else if (step === 12 && manager === "Alice") {
    return (
      <>
        <p>Ha! You've only gone and destroyed this contraption!</p>
        <p>
          It's a right laugh! Your chance of disaster is {chanceDisaster}%, but
          you can work on that with a bit of experience.
        </p>
      </>
    );
  } else if (step === 12 && manager === "Matt") {
    return (
      <>
        <p>Idiot! You've destroyed the hardware!</p>
        <p>You have a contemptible {chanceDisaster}% chance of disaster.</p>
      </>
    );
  } else if (step === 13 && manager === "Lukasz") {
    return (
      <p>
        That's all the induction I had planned for today. You now know enough to
        try it on your own. Good luck!
      </p>
    );
  } else if (step === 13 && manager === "Alice") {
    return (
      <p>
        That's all I've got time for. You should be able to handle it from here.
        Off you go! Tappy tappy click click!
      </p>
    );
  } else if (step === 13 && manager === "Matt") {
    return <p>I'm done. Off you go. Try not to screw it up.</p>;
  }

  return null;
};

Text.propTypes = {
  step: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  chanceDisaster: PropTypes.number.isRequired,
  manager: PropTypes.string.isRequired,
  ticket: PropTypes.shape({
    customer: PropTypes.string.isRequired,
    issueType: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    patience: PropTypes.number.isRequired,
  }).isRequired,
};

export default Text;
