import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faTachometerAlt,
  faUsers,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

import css from "./Menu.module.css";

export const Menu = ({ username }) => (
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
    </ul>
  </nav>
);

Menu.propTypes = {
  username: PropTypes.string.isRequired,
};

export const mapStateToProps = (state) => {
  return {
    username: state.player.username,
  };
};

export default connect(mapStateToProps)(Menu);
