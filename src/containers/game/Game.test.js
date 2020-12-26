import React from "react";
import { shallow } from "enzyme";

import { mapStateToProps, Game } from "./Game";
import { STAGES } from "../../shared/config";
import Helpdesk from "../helpdesk/Helpdesk";

describe("<Game />", () => {
  describe("mapStateToProps", () => {
    it("should map the state to props correctly", () => {
      const game = {
        stage: "test",
      };
      const appState = { game };
      const componentState = mapStateToProps(appState);

      expect(componentState).toEqual(game);
    });
  });

  describe("display", () => {
    let wrapper;
    const stage = "test";

    beforeEach(() => {
      wrapper = shallow(<Game stage={stage} />);
    });

    it("should render null if no valid stage is passed in", () => {
      expect(wrapper.type()).toEqual(null);
    });

    it("should render a <Helpdesk /> element if stage is helpdesk", () => {
      wrapper.setProps({ stage: STAGES.helpdesk });
      const hd = wrapper.find(Helpdesk);

      expect(hd).toHaveLength(1);
    });
  });
});
