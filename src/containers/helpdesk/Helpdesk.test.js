import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";

import css from "./Helpdesk.module.css";
import { mapStateToProps, mapDispatchToProps, Helpdesk } from "./Helpdesk";

describe("<Helpdesk />", () => {
  describe("mapStateToProps", () => {
    it("should map the state to props correctly", () => {
      const game = {
        allOptions: [],
        closedTickets: [],
        openTickets: [],
        selectedTicket: [],
      };
      const appState = { game: game };
      const componentState = mapStateToProps(appState);

      expect(componentState).toEqual(game);
    });
  });

  describe("mapDispatchToProps", () => {
    it("should map the dispatch functions to props correctly", () => {
      const componentDispatch = mapDispatchToProps(jest.fn);

      expect(typeof componentDispatch.onSelectTicket).toBe("function");
      expect(typeof componentDispatch.onCloseTicket).toBe("function");
    });
  });

  describe("display", () => {
    let wrapper;
    const allOptions = {};
    const closedTickets = [];
    const openTickets = [];
    const selectedTicket = null;
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
            allOptions,
            closedTickets,
            openTickets,
            selectedTicket,
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
