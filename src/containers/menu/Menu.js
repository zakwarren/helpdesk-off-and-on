import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

import css from "./Menu.module.css";

export const Menu = ({ player }) => {
  const { username, level, manager, charisma, chanceDisaster, skills } = player;
  const skillKeys = Object.keys(skills);

  return (
    <nav className={css.Menu} tabIndex="0">
      <div className={css.MenuBar}>
        <div className={css.MenuButton}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <header className={css.Header}>
        <div className={css.Avatar}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <h2>{username}</h2>
      </header>
      <ul>
        <li>Manager: {manager}</li>
        <li>Level: {level}</li>
        <li>Charisma: {charisma}%</li>
        <li>Chance of Disaster: {chanceDisaster}%</li>
        {skillKeys.map((s) => (
          <li key={s}>
            {s}: {skills[s]}%
          </li>
        ))}
      </ul>
      {/* <ul>
      <NavLink to="/dashboard" activeClassName={css.Active}>
        <FontAwesomeIcon icon={faTachometerAlt} />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/" activeClassName={css.Active}>
        <FontAwesomeIcon icon={faUsers} />
        <span>Helpdesk</span>
      </NavLink>
      <NavLink to="/settings" activeClassName={css.Active}>
        <FontAwesomeIcon icon={faCog} />
        <span>Settings</span>
      </NavLink>
    </ul> */}
    </nav>
  );
};

Menu.propTypes = {
  player: PropTypes.shape({
    username: PropTypes.string,
    manager: PropTypes.string,
    level: PropTypes.number.isRequired,
    experience: PropTypes.number.isRequired,
    charisma: PropTypes.number.isRequired,
    chanceDisaster: PropTypes.number.isRequired,
    skills: PropTypes.object.isRequired,
  }).isRequired,
};

export const mapStateToProps = (state) => {
  return {
    player: state.player,
  };
};

export default connect(mapStateToProps)(Menu);
