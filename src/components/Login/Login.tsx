import React, { FC } from "react";
import { Form, Field } from "react-final-form";
import { Redirect } from "react-router-dom";
import { LoginFormDataType, OnSubmitType } from "../../types/types";
import Preloader from "../Preloader";
import { Input, Checkbox, Button, Row } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

type ValidateEmailType = (email: string) => string | undefined;
type ValidateRequiredType = (value: string) => string | undefined;

const composeValidators = (
  ...validators: [ValidateRequiredType, ValidateEmailType]
) => (value: string) =>
  validators.reduce(
    (error: any, validator) => error || validator(value),
    undefined
  );

const required: ValidateRequiredType = (value) =>
  value ? undefined : "Обязательное поле";

const validateEmail: ValidateEmailType = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email) ? undefined : "Введите правильный email";
};

type LoginPropsType = {
  onSubmit: OnSubmitType<LoginFormDataType>;
  isAuth: boolean;
  isSubmiting: boolean;
  captchaUrl: string | null;
  authUserId: string | number | null;
};

const Login: FC<LoginPropsType> = ({
  onSubmit,
  isAuth,
  isSubmiting,
  captchaUrl,
  authUserId,
}) => {
  if (isAuth && authUserId) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className="login">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitError }) => (
          <form className="login__form" onSubmit={handleSubmit}>
            <h2 className="login__title">Login</h2>
            {submitError && (
              <div className="login__form-error">{submitError}</div>
            )}
            <Field
              validate={composeValidators(required, validateEmail)}
              name="email"
            >
              {({ input, meta }) => {
                return (
                  <div className="login__input">
                    <label className="login__label">
                      Email
                      <Input
                        placeholder="Введите email"
                        type="email"
                        {...input}
                        autoComplete="off"
                      />
                    </label>
                    {meta.error && meta.touched && (
                      <span className="login__error">{meta.error}</span>
                    )}
                  </div>
                );
              }}
            </Field>
            <Field name="password" validate={required}>
              {({ input, meta }) => {
                return (
                  <div className="login__input">
                    <label className="login__label">
                      Password
                      <Input.Password
                        placeholder="Введите пароль"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        {...input}
                      />
                    </label>
                    {meta.error && meta.touched && (
                      <span className="login__error">{meta.error}</span>
                    )}
                  </div>
                );
              }}
            </Field>
            <Field name="rememberMe" type="checkbox">
              {({ input, meta }) => {
                return (
                  <Checkbox {...input} className="login__checkbox">
                    Remember me
                  </Checkbox>
                );
              }}
            </Field>
            {captchaUrl && (
              <div className="login__captcha">
                <img src={captchaUrl} alt="captcha" />
                <Field name="captcha" validate={required}>
                  {({ input, meta }) => (
                    <div className="login__input">
                      <Input
                        placeholder="Введите текст с картинки"
                        type="text"
                        {...input}
                        autoComplete="off"
                      />
                      {meta.error && meta.touched && (
                        <span className="login__error">{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
              </div>
            )}
            <Row>
              <Button
                className="login__btn"
                htmlType="submit"
                type="primary"
                disabled={isSubmiting}
              >
                {isSubmiting ? "Submiting .." : "Login"}
              </Button>
            </Row>
          </form>
        )}
      />
      {isSubmiting && (
        <Preloader size={"small"} style={{ position: "relative" }} />
      )}
    </div>
  );
};

export default Login;
