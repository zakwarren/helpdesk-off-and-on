import React from "react";
import { shallow } from "enzyme";

import css from "./Tutorial.module.css";
import { mapStateToProps, mapDispatchToProps, Tutorial } from "./Tutorial";
import { IssueTray } from "../../components";

describe("<Tutorial />", () => {
  describe("mapStateToProps", () => {
    it("should map the state to props correctly", () => {
      const player = {
        username: null,
      };
      const appState = { player };
      const componentState = mapStateToProps(appState);

      expect(componentState).toEqual(player);
    });
  });

  describe("mapDispatchToProps", () => {
    it("should map the dispatch functions to props correctly", () => {
      const componentDispatch = mapDispatchToProps(jest.fn);

      expect(typeof componentDispatch.onToHelpdesk).toBe("function");
    });
  });

  describe("display", () => {
    let wrapper;
    const username = "Test";
    const onToHelpdesk = jest.fn;

    beforeEach(() => {
      wrapper = shallow(<Tutorial {...{ username, onToHelpdesk }} />);
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
      expect(h3.text()).toEqual("Lukasz:");
    });
  });
});
