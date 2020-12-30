import React from "react";
import { shallow } from "enzyme";

import css from "./Review.module.css";
import { mapStateToProps, mapDispatchToProps, Review } from "./Review";
import { Card } from "../../components";

import * as hooks from "../../hooks";
jest.mock("../../hooks", () => ({
  useSaveGame: jest.fn,
}));

describe("<Review />", () => {
  describe("mapStateToProps", () => {
    it("should map the state to props correctly", () => {
      const player = {
        username: "Test",
        manager: "Test",
        dayExperience: 0,
      };
      const game = {
        day: 1,
        closedTickets: [],
        failedTickets: [],
        yearData: {
          experience: 0,
          closedTickets: 0,
          failedTickets: 0,
          openTickets: 0,
        },
      };
      const appState = { player, game };
      const componentState = mapStateToProps(appState);

      expect(componentState.username).toEqual(player.username);
      expect(componentState.manager).toEqual(player.manager);
      expect(componentState.dayExperience).toEqual(player.dayExperience);

      expect(componentState.day).toEqual(game.day);
      expect(componentState.closedTickets).toEqual(game.closedTickets.length);
      expect(componentState.failedTickets).toEqual(game.failedTickets.length);
      expect(componentState.yearData).toEqual(game.yearData);
    });
  });

  describe("mapDispatchToProps", () => {
    it("should map the dispatch functions to props correctly", () => {
      const componentDispatch = mapDispatchToProps(jest.fn);

      expect(typeof componentDispatch.onNextDay).toBe("function");
    });
  });

  describe("display", () => {
    let wrapper;
    const username = "Test";
    const manager = "Tester";
    const day = 1;
    const dayExperience = 1;
    const closedTickets = 1;
    const failedTickets = 1;
    const yearData = {
      experience: 1,
      closedTickets: 1,
      failedTickets: 1,
      openTickets: 2,
    };
    const onNextDay = jest.fn;

    beforeEach(() => {
      wrapper = shallow(
        <Review
          {...{
            username,
            manager,
            day,
            dayExperience,
            closedTickets,
            failedTickets,
            yearData,
            onNextDay,
          }}
        />
      );
    });

    it("should render an <section /> element with the correct class", () => {
      const section = wrapper.find("section");

      expect(section).toHaveLength(1);
      expect(section.hasClass(css.Review)).toEqual(true);
    });

    it("should render a <h1 /> element with the daily title", () => {
      const h1 = wrapper.find("h1");

      expect(h1).toHaveLength(1);
      expect(h1.text()).toEqual("Daily Review");
    });

    it("should render a <h1 /> element with the yearly title", () => {
      wrapper.setProps({ day: 10 });
      const h1 = wrapper.find("h1");

      expect(h1).toHaveLength(1);
      expect(h1.text()).toEqual("Yearly Review");
    });

    it("should render a <p /> element with the correct class and text", () => {
      const p = wrapper.find(`p.${css.Speaker}`);

      expect(p).toHaveLength(1);
      expect(p.text()).toEqual(`${manager}:`);
    });

    it("should render a <div /> element with the correct class", () => {
      const div = wrapper.find("div");

      expect(div).toHaveLength(1);
      expect(div.hasClass(css.Stats)).toEqual(true);
    });

    it("should render three <Card /> elements for daily review", () => {
      const c = wrapper.find(Card);

      expect(c).toHaveLength(3);
    });

    it("should render three <Card /> elements for yearly review", () => {
      wrapper.setProps({ day: 10 });
      const c = wrapper.find(Card);

      expect(c).toHaveLength(6);
    });

    it("should render a <button /> element with the correct onClick function", () => {
      const btn = wrapper.find("button");

      expect(btn).toHaveLength(1);
      expect(btn.text()).toEqual("Next Day");
      expect(btn.prop("onClick")).toEqual(onNextDay);
    });
  });
});
