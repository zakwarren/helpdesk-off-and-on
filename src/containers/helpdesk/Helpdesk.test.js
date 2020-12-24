import React from "react";
import { shallow } from "enzyme";

import css from "./Helpdesk.module.css";
import { mapStateToProps, mapDispatchToProps, Helpdesk } from "./Helpdesk";

describe("<Helpdesk />", () => {
  describe("mapStateToProps", () => {
    it("should map the state to props correctly", () => {
      const game = {
        customer: null,
        issueType: null,
        issue: null,
      };
      const appState = { game: game };
      const componentState = mapStateToProps(appState);

      expect(componentState).toEqual(game);
    });
  });

  describe("mapDispatchToProps", () => {
    it("should map the dispatch functions to props correctly", () => {
      const componentDispatch = mapDispatchToProps(jest.fn);

      expect(typeof componentDispatch.onGetCustomer).toBe("function");
    });
  });

  describe("display", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Helpdesk
          customer="Test"
          issueType="test"
          issue="Testing"
          onGetCustomer={jest.fn}
        />
      );
    });
  });
});
