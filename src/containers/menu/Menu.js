import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
      <li tabIndex="0">
        <FontAwesomeIcon icon={faTachometerAlt} />
        <span>Dashboard</span>
      </li>
      <li tabIndex="0">
        <FontAwesomeIcon icon={faUsers} />
        <span>Customers</span>
      </li>
      <li tabIndex="0">
        <FontAwesomeIcon icon={faCog} />
        <span>Settings</span>
      </li>
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
