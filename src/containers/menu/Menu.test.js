import React from "react";
import { shallow } from "enzyme";

import css from "./Menu.module.css";
import Menu from "./Menu";

describe("<Menu />", () => {
  let wrapper;
  const username = "Test";

  beforeEach(() => {
    wrapper = shallow(<Menu username={username} />);
  });

  it("should render with a <Nav /> element and correct class", () => {
    const nav = wrapper.find("nav");

    expect(nav).toHaveLength(1);
    expect(nav.hasClass(css.Menu)).toEqual(true);
  });

  it("should render a menu button <div /> element", () => {
    const bar = wrapper.find(`div.${css.MenuBar}`);
    const btn = wrapper.find(`div.${css.MenuButton}`);

    expect(bar).toHaveLength(1);
    expect(btn).toHaveLength(1);
  });

  it("should render a <header /> element with the correct class", () => {
    const header = wrapper.find("header");

    expect(header).toHaveLength(1);
    expect(header.hasClass(css.Header)).toEqual(true);
  });

  it("should render a avatar <div /> element", () => {
    const div = wrapper.find(`div.${css.Avatar}`);

    expect(div).toHaveLength(1);
  });

  it("should render a <h2 /> element with the username as text", () => {
    const h2 = wrapper.find("h2");

    expect(h2).toHaveLength(1);
    expect(h2.text()).toEqual(username);
  });

  it("should render a <ul /> element", () => {
    const ul = wrapper.find("ul");

    expect(ul).toHaveLength(1);
  });

  it("should render the menu items in <li /> elements", () => {
    const lis = wrapper.find("li");
    const spans = wrapper.find("span");

    expect(lis).toHaveLength(3);
    expect(spans).toHaveLength(3);
  });
});
