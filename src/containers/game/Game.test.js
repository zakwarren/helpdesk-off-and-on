import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";

import Game from "./Game";
import { STAGES } from "../../shared/config";
import Setup from "../setup/Setup";
import Tutorial from "../tutorial/Tutorial";
import Helpdesk from "../helpdesk/Helpdesk";
import Review from "../review/Review";

describe("<Game />", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should render null if no valid stage is passed in", () => {
    jest.spyOn(redux, "useSelector").mockImplementation(() => "test");
    const wrapper = shallow(<Game />);
    expect(wrapper.type()).toEqual(null);
  });

  it("should render a <Setup /> element if stage is setup", () => {
    jest.spyOn(redux, "useSelector").mockImplementation(() => STAGES.setup);
    const wrapper = shallow(<Game />);

    const s = wrapper.find(Setup);

    expect(s).toHaveLength(1);
  });

  it("should render a <Helpdesk /> element if stage is tutorial", () => {
    jest.spyOn(redux, "useSelector").mockImplementation(() => STAGES.tutorial);
    const wrapper = shallow(<Game />);

    const tut = wrapper.find(Tutorial);

    expect(tut).toHaveLength(1);
  });

  it("should render a <Helpdesk /> element if stage is helpdesk", () => {
    jest.spyOn(redux, "useSelector").mockImplementation(() => STAGES.helpdesk);
    const wrapper = shallow(<Game />);

    const hd = wrapper.find(Helpdesk);

    expect(hd).toHaveLength(1);
  });

  it("should render a <Review /> element if stage is review", () => {
    jest.spyOn(redux, "useSelector").mockImplementation(() => STAGES.review);
    const wrapper = shallow(<Game />);

    const daily = wrapper.find(Review);

    expect(daily).toHaveLength(1);
  });
});
