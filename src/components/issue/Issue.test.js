import React from "react";
import { shallow } from "enzyme";

import css from "./Issue.module.css";
import { Issue } from "./Issue";
import { Card } from "../card/Card";

describe("<Issue />", () => {
  let wrapper;
  const isEnabled = false;
  const isActive = false;
  const customer = "Test";
  const issueType = "test";
  const issue = "Testing";

  beforeEach(() => {
    wrapper = shallow(
      <Issue {...{ isEnabled, isActive, customer, issueType, issue }} />
    );
  });

  it("should render a <Card /> element", () => {
    const card = wrapper.find(Card);

    expect(card).toHaveLength(1);
  });

  it("should render a <div /> element with the correct class", () => {
    const div = wrapper.find("div");

    expect(div).toHaveLength(1);
    expect(div.hasClass(css.Issue)).toEqual(true);
  });

  it("should render a <span /> element with the correct class and content", () => {
    const span = wrapper.find("span");

    expect(span).toHaveLength(1);
    expect(span.hasClass(css.Type)).toEqual(true);
    expect(span.text()).toEqual(issueType);
  });

  it("should render a <h4 /> element with the correct content", () => {
    const h4 = wrapper.find("h4");

    expect(h4).toHaveLength(1);
    expect(h4.text()).toEqual(customer);
  });

  it("should render a <p /> element with the correct content", () => {
    const p = wrapper.find("p");

    expect(p).toHaveLength(1);
    expect(p.text()).toEqual(`"${issue}"`);
  });
});
