import React from "react";
import { shallow } from "enzyme";

import css from "./IssueTray.module.css";
import { IssueTray } from "./IssueTray";
import { Card } from "../card/Card";

describe("<IssueTray />", () => {
  let wrapper;
  const testTicket = {
    id: 1,
    customer: "Test",
    issueType: "test",
    issue: "testing",
  };
  const tickets = [testTicket];
  const selectedTicket = null;
  const isEnabled = false;
  const onClick = jest.fn;

  beforeEach(() => {
    wrapper = shallow(
      <IssueTray {...{ tickets, selectedTicket, isEnabled, onClick }} />
    );
  });

  it("should render a <section /> element with the correct class", () => {
    const section = wrapper.find("section");

    expect(section).toHaveLength(1);
    expect(section.hasClass(css.IssueTray)).toEqual(true);
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
    expect(span.text()).toEqual(tickets[0].issueType);
  });

  it("should render a <h4 /> element with the correct content", () => {
    const h4 = wrapper.find("h4");

    expect(h4).toHaveLength(1);
    expect(h4.text()).toEqual(tickets[0].customer);
  });

  it("should render a <p /> element with the correct content", () => {
    const p = wrapper.find("p");

    expect(p).toHaveLength(1);
    expect(p.text()).toEqual(`"${tickets[0].issue}"`);
  });

  it("should set isActive to true when selectedTicket matches", () => {
    wrapper.setProps({ selectedTicket: testTicket });
    const card = wrapper.find(Card);

    expect(card).toHaveLength(1);
    expect(card.prop("isActive")).toEqual(true);
  });
});
