import React from "react";
import { shallow } from "enzyme";

import css from "./Card.module.css";
import Card from "./Card";

describe("<Menu />", () => {
  let wrapper;
  const children = <p>Test</p>;

  beforeEach(() => {
    wrapper = shallow(<Card>{children}</Card>);
  });

  it("should render a card and container <div /> elements", () => {
    const card = wrapper.find(`div.${css.Card}`);
    const container = wrapper.find(`div.${css.Container}`);

    expect(card).toHaveLength(1);
    expect(container).toHaveLength(1);
  });

  it("should render the children correctly", () => {
    const p = wrapper.find("p");

    expect(p).toHaveLength(1);
    expect(p.text()).toEqual("Test");
  });
});
