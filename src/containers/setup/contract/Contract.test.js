import React from "react";
import { shallow } from "enzyme";

import css from "../Setup.module.css";
import { Contract, mapDispatchToProps } from "./Contract";
import { Formik } from "formik";

describe("<Contract />", () => {
  describe("mapDispatchToProps", () => {
    it("should map the dispatch functions to props correctly", () => {
      const componentDispatch = mapDispatchToProps(jest.fn);

      expect(typeof componentDispatch.onSetUsername).toBe("function");
    });
  });

  describe("display", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Contract css={css} onSetUsername={jest.fn} onSuccess={jest.fn} />
      );
    });

    it("should render a <Form /> element", () => {
      const form = wrapper.find(Formik);

      expect(form).toHaveLength(1);
    });
  });
});
