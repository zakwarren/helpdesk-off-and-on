import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

import * as actions from "../../../store/actions";

export const Contract = (props) => {
  const { css, onSuccess, onSetUsername } = props;

  const initialValues = {
    name: "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string("That's not a name!"),
  });
  const onSubmit = (values) => {
    const name = values.name || "Mikey";
    onSetUsername(name);
    onSuccess();
  };

  return (
    <Formik {...{ initialValues, validationSchema, onSubmit }}>
      {({ errors, touched }) => (
        <Form className={css.Form}>
          <h3>Contract</h3>
          <div className={css.InputContainer}>
            <label className={css.Label} htmlFor="name">
              Name:
            </label>
            <Field
              className={css.Input}
              type="input"
              id="name"
              name="name"
              placeholder="Mikey"
            />
            {errors.name && touched.name ? (
              <div className={css.ValidationError}>{errors.name}</div>
            ) : null}
          </div>
          <div className={css.Controls}>
            <button type="submit">Sign Contract</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

Contract.propTypes = {
  css: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onSetUsername: PropTypes.func.isRequired,
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onSetUsername: (name) => dispatch(actions.setUsername(name)),
  };
};

export default connect(null, mapDispatchToProps)(Contract);
