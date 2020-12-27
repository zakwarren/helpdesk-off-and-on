import React from "react";
import { shallow } from "enzyme";

import { mapStateToProps, Game } from "./Game";
import { STAGES } from "../../shared/config";
import Setup from "../setup/Setup";
import Tutorial from "../tutorial/Tutorial";
import Helpdesk from "../helpdesk/Helpdesk";
import Review from "../review/Review";

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

    it("should render a <Setup /> element if stage is setup", () => {
      wrapper.setProps({ stage: STAGES.setup });
      const s = wrapper.find(Setup);

      expect(s).toHaveLength(1);
    });

    it("should render a <Helpdesk /> element if stage is tutorial", () => {
      wrapper.setProps({ stage: STAGES.tutorial });
      const tut = wrapper.find(Tutorial);

      expect(tut).toHaveLength(1);
    });

    it("should render a <Helpdesk /> element if stage is helpdesk", () => {
      wrapper.setProps({ stage: STAGES.helpdesk });
      const hd = wrapper.find(Helpdesk);

      expect(hd).toHaveLength(1);
    });

    it("should render a <Review /> element if stage is review", () => {
      wrapper.setProps({ stage: STAGES.review });
      const daily = wrapper.find(Review);

      expect(daily).toHaveLength(1);
    });
  });
});
