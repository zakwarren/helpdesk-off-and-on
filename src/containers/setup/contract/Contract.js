import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

import * as actions from "../../../store/actions";
import { MANAGERS } from "../../../shared/config";

export const Contract = (props) => {
  const { css, onSuccess, onCreatePlayer } = props;
  const managers = Object.keys(MANAGERS);

  const initialValues = {
    name: "",
    difficulty: managers[0] || "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string("That's not a name!"),
    difficulty: yup.string().required("Choose a manager!"),
  });
  const onSubmit = (values) => {
    const name = values.name || "Mikey";
    onCreatePlayer(name, values.difficulty);
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
          <div className={css.InputContainer}>
            <label className={css.Label} htmlFor="difficulty">
              Manager:
            </label>
            <div className={css.Difficulty}>
              {managers.map((man) => (
                <React.Fragment key={man}>
                  <Field type="radio" name="difficulty" id={man} value={man} />
                  <label htmlFor={man}>{man}</label>
                </React.Fragment>
              ))}
            </div>
            {errors.difficulty && touched.difficulty ? (
              <div className={css.ValidationError}>{errors.difficulty}</div>
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
  onCreatePlayer: PropTypes.func.isRequired,
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onCreatePlayer: (name, manager) =>
      dispatch(actions.createPlayer(name, manager)),
  };
};

export default connect(null, mapDispatchToProps)(Contract);
