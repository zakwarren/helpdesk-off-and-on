import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";

import css from "./Helpdesk.module.css";
import { mapStateToProps, mapDispatchToProps, Helpdesk } from "./Helpdesk";
import { IssueTray } from "../../components/";

describe("<Helpdesk />", () => {
  describe("mapStateToProps", () => {
    it("should map the state to props correctly", () => {
      const player = {
        skills: {},
        charisma: 1,
      };
      const game = {
        openTickets: [],
        selectedTicket: [],
        message: null,
      };
      const appState = { player, game };
      const componentState = mapStateToProps(appState);

      expect(componentState.skills).toEqual(player.skills);
      expect(componentState.charisma).toEqual(player.charisma);
      expect(componentState.openTickets).toEqual(game.openTickets);
      expect(componentState.selectedTicket).toEqual(game.selectedTicket);
      expect(componentState.message).toEqual(game.message);
    });
  });

  describe("mapDispatchToProps", () => {
    it("should map the dispatch functions to props correctly", () => {
      const componentDispatch = mapDispatchToProps(jest.fn);

      expect(typeof componentDispatch.onAddExperience).toBe("function");
      expect(typeof componentDispatch.onSelectTicket).toBe("function");
      expect(typeof componentDispatch.onCloseTicket).toBe("function");
      expect(typeof componentDispatch.onFailTicket).toBe("function");
      expect(typeof componentDispatch.onFailAllOpen).toBe("function");
      expect(typeof componentDispatch.onEndDay).toBe("function");
    });
  });

  describe("display", () => {
    let wrapper;
    const skills = {};
    const charisma = 50;
    const openTickets = [
      {
        id: 1,
        customer: "Test",
        issueType: "test",
        issue: "Test",
        experience: 1,
        patience: 1,
      },
    ];
    const selectedTicket = null;
    const message = null;
    const onAddExperience = jest.fn;
    const onSelectTicket = jest.fn;
    const onCloseTicket = jest.fn;
    const onFailTicket = jest.fn;
    const onFailAllOpen = jest.fn;
    const onEndDay = jest.fn;

    beforeAll(() => {
      jest.spyOn(redux, "useDispatch").mockImplementation(jest.fn);
      jest.spyOn(redux, "useSelector").mockImplementation(() => 0);
    });

    beforeEach(() => {
      wrapper = shallow(
        <Helpdesk
          {...{
            skills,
            charisma,
            openTickets,
            selectedTicket,
            message,
            onAddExperience,
            onSelectTicket,
            onCloseTicket,
            onFailTicket,
            onFailAllOpen,
            onEndDay,
          }}
        />
      );
    });

    it("should render an <IssueTray /> element", () => {
      const tray = wrapper.find(IssueTray);

      expect(tray).toHaveLength(1);
    });

    it("should render a <section /> element with the correct class", () => {
      const section = wrapper.find("section");

      expect(section).toHaveLength(1);
      expect(section.hasClass(css.Controls)).toEqual(true);
    });

    it("should render a <h3 /> element", () => {
      const h3 = wrapper.find("h3");

      expect(h3).toHaveLength(1);
      expect(h3.text()).toEqual("Options");
    });
  });
});
