import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";

import css from "./Helpdesk.module.css";
import { mapStateToProps, mapDispatchToProps, Helpdesk } from "./Helpdesk";

describe("<Helpdesk />", () => {
  describe("mapStateToProps", () => {
    it("should map the state to props correctly", () => {
      const player = {
        skills: {},
      };
      const game = {
        closedTickets: [],
        openTickets: [],
        selectedTicket: [],
      };
      const appState = { player, game };
      const componentState = mapStateToProps(appState);

      expect(componentState.skills).toEqual(player.skills);
      expect(componentState.closedTickets).toEqual(game.closedTickets);
      expect(componentState.openTickets).toEqual(game.openTickets);
      expect(componentState.selectedTicket).toEqual(game.selectedTicket);
    });
  });

  describe("mapDispatchToProps", () => {
    it("should map the dispatch functions to props correctly", () => {
      const componentDispatch = mapDispatchToProps(jest.fn);

      expect(typeof componentDispatch.onAddExperience).toBe("function");
      expect(typeof componentDispatch.onSelectTicket).toBe("function");
      expect(typeof componentDispatch.onCloseTicket).toBe("function");
    });
  });

  describe("display", () => {
    let wrapper;
    const skills = {};
    const closedTickets = [];
    const openTickets = [];
    const selectedTicket = null;
    const onAddExperience = jest.fn;
    const onSelectTicket = jest.fn;
    const onCloseTicket = jest.fn;

    beforeAll(() => {
      jest.spyOn(redux, "useDispatch").mockImplementation(jest.fn);
      jest.spyOn(redux, "useSelector").mockImplementation(() => 0);
    });

    beforeEach(() => {
      wrapper = shallow(
        <Helpdesk
          {...{
            skills,
            closedTickets,
            openTickets,
            selectedTicket,
            onAddExperience,
            onSelectTicket,
            onCloseTicket,
          }}
        />
      );
    });

    it("should render two <section /> elements with the correct classes", () => {
      const sections = wrapper.find("section");

      expect(sections).toHaveLength(2);
      expect(sections.get(0).props.className).toEqual(css.IssueTray);
      expect(sections.get(1).props.className).toEqual(css.Controls);
    });
  });
});
