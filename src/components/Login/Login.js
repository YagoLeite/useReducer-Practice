import React, { useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-contex";

const formReducer = (state, action) => {
  if (action.type === "EMAIL_INPUT") {
    return {
      ...state,
      emailValue: action.value,
      emailIsValid: action.value.includes("@"),
      formIsValid: state.emailIsValid && state.passwordIsValid,
    };
  }

  if (action.type === "EMAIL_BLUR") {
    return {
      ...state,
      emailIsValid: state.emailValue.includes("@"),
      formIsValid: state.emailIsValid && state.passwordIsValid,
    };
  }

  if (action.type === "PASSWORD_INPUT") {
    return {
      ...state,
      passwordValue: action.value,
      passwordIsValid: action.value.trim().length > 6,
      formIsValid: state.emailIsValid && state.passwordIsValid,
    };
  }

  if (action.type === "PASSWORD_BLUR") {
    return {
      ...state,
      passwordIsValid: state.passwordValue.trim().length > 6,
      formIsValid: state.emailIsValid && state.passwordIsValid,
    };
  }

  return {
    emailValue: "",
    emailIsValid: null,
    passwordValue: "",
    passwordIsValid: null,
    formIsValid: false,
  };
};

const Login = (props) => {
  const [formState, dispatchForm] = useReducer(formReducer, {
    emailValue: "",
    emailIsValid: null,
    passwordValue: "",
    passwordIsValid: null,
    formIsValid: false,
  });

  const emailChangeHandler = (event) => {
    dispatchForm({ type: "EMAIL_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchForm({ type: "PASSWORD_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchForm({ type: "EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchForm({ type: "PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(formState.emailValue, formState.passwordValue);
  };

  const ctx = useContext(AuthContext);

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formState.emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.emailValue}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            formState.passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState.passwordValue}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!formState.formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
