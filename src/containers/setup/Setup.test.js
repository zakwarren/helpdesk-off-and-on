import React from "react";
import { shallow } from "enzyme";

import css from "./Setup.module.css";
import { mapStateToProps, mapDispatchToProps, Setup } from "./Setup";
import Contract from "./contract/Contract";

describe("<Setup />", () => {
  describe("mapStateToProps", () => {
    it("should map the state to props correctly", () => {
      const player = {
        username: null,
        manager: "Test",
      };
      const appState = { player };
      const componentState = mapStateToProps(appState);

      expect(componentState).toEqual(player);
    });
  });

  describe("mapDispatchToProps", () => {
    it("should map the dispatch functions to props correctly", () => {
      const componentDispatch = mapDispatchToProps(jest.fn);

      expect(typeof componentDispatch.onSetStage).toBe("function");
    });
  });

  describe("display", () => {
    let wrapper;
    const username = "Test";
    const manager = "Tester";
    const onSetStage = jest.fn;

    beforeEach(() => {
      wrapper = shallow(<Setup {...{ username, manager, onSetStage }} />);
    });

    it("should render an <section /> element with the correct class", () => {
      const section = wrapper.find("section");

      expect(section).toHaveLength(1);
      expect(section.hasClass(css.Setup)).toEqual(true);
    });

    it("should render a <h1 /> element with the correct text", () => {
      const h1 = wrapper.find("h1");

      expect(h1).toHaveLength(1);
      expect(h1.text()).toEqual("Helpdesk Simulator");
    });

    it("should render a <p /> element with the correct class and text", () => {
      const p = wrapper.find(`p.${css.Speaker}`);

      expect(p).toHaveLength(1);
      expect(p.text()).toEqual(`${manager}:`);
    });

    it("should render a <Contract /> element when step state is 0", () => {
      const c = wrapper.find(Contract);

      expect(c).toHaveLength(1);
    });
  });
});
