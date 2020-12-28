import React from "react";
import { shallow } from "enzyme";

import css from "./Menu.module.css";
import { mapStateToProps, Menu } from "./Menu";

describe("<Menu />", () => {
  describe("mapStateToProps", () => {
    it("should map the state to props correctly", () => {
      const player = {
        username: "Test",
        manager: "Tester",
        level: 1,
        experience: 0,
        charisma: 50,
        chanceDisaster: 50,
        skills: {
          password: 5,
          hardware: 5,
        },
      };
      const appState = { player: player };
      const componentState = mapStateToProps(appState);

      expect(componentState).toEqual({ player });
    });
  });

  describe("display", () => {
    let wrapper;
    const player = {
      username: "Test",
      manager: "Tester",
      level: 1,
      experience: 0,
      charisma: 50,
      chanceDisaster: 50,
      skills: {
        password: 5,
        hardware: 5,
      },
    };

    beforeEach(() => {
      wrapper = shallow(<Menu player={player} />);
    });

    it("should render with a <Nav /> element and correct class", () => {
      const nav = wrapper.find("nav");

      expect(nav).toHaveLength(1);
      expect(nav.hasClass(css.Menu)).toEqual(true);
    });

    it("should render a menu button <div /> element", () => {
      const bar = wrapper.find(`div.${css.MenuBar}`);
      const btn = wrapper.find(`div.${css.MenuButton}`);

      expect(bar).toHaveLength(1);
      expect(btn).toHaveLength(1);
    });

    it("should render a <header /> element with the correct class", () => {
      const header = wrapper.find("header");

      expect(header).toHaveLength(1);
      expect(header.hasClass(css.Header)).toEqual(true);
    });

    it("should render a avatar <div /> element", () => {
      const div = wrapper.find(`div.${css.Avatar}`);

      expect(div).toHaveLength(1);
    });

    it("should render a <h2 /> element with the username as text", () => {
      const h2 = wrapper.find("h2");

      expect(h2).toHaveLength(1);
      expect(h2.text()).toEqual(player.username);
    });

    it("should render a <ul /> element", () => {
      const ul = wrapper.find("ul");

      expect(ul).toHaveLength(1);
    });

    it("should render a number of <li /> elements", () => {
      const lis = wrapper.find("li");

      expect(lis.length).toBeGreaterThan(1);
    });
  });
});
