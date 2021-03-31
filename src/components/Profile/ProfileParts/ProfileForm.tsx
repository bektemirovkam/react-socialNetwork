import React, { FC } from "react";
import { Field, Form } from "react-final-form";
import { CallbackFormType, ProfileType } from "../../../types/types";

import { Input, Checkbox, Button, Row } from "antd";

const { TextArea } = Input;

const isRequired = (value: string | number | undefined) =>
  value ? undefined : "Обязательное поле";

type ProfileFormPropsType = {
  profile: ProfileType | null;
  onSubmit: (
    values: ProfileType,
    form: any,
    callback?: CallbackFormType
  ) => Object | Promise<Object> | void;
  handleEditClick: () => void;
};

const ProfileForm: FC<ProfileFormPropsType> = ({
  profile,
  onSubmit,
  handleEditClick,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={profile}
      render={({ handleSubmit, submitError, submitting, pristine }) => {
        return (
          <form onSubmit={handleSubmit} className="form-profile">
            <Field
              name="fullName"
              text="Full Name"
              validate={isRequired}
              render={({ input, meta }) => (
                <label>
                  Full Name
                  <Input
                    placeholder="Full name"
                    type="text"
                    {...input}
                    autoComplete="off"
                  />
                  {meta.error && meta.touched && (
                    <span className="form-profile__field-error">
                      {meta.error}
                    </span>
                  )}
                </label>
              )}
            />
            <Field
              name="aboutMe"
              validate={isRequired}
              render={({ input, meta }) => (
                <label className="form-profile__label">
                  <div className="form-profile__text">About me</div>
                  <TextArea {...input} rows={4} placeholder="About me" />
                  {meta.error && meta.touched && (
                    <span className="form-profile__field-error">
                      {meta.error}
                    </span>
                  )}
                </label>
              )}
            />
            <Row>
              <Field
                name="lookingForAJob"
                type="checkbox"
                validate={isRequired}
                render={({ input, meta }) => {
                  return (
                    <Checkbox {...input} className="form-profile__checkbox">
                      Looking for a job
                    </Checkbox>
                  );
                }}
              />
            </Row>
            <Field
              name="lookingForAJobDescription"
              validate={isRequired}
              render={({ input, meta }) => (
                <label className="form-profile__label">
                  <div>Looking for a job description</div>
                  <TextArea
                    {...input}
                    rows={4}
                    placeholder="looking for a job description"
                  />
                  {meta.error && meta.touched && (
                    <span className="form-profile__field-error">
                      {meta.error}
                    </span>
                  )}
                </label>
              )}
            />
            <br />
            {profile &&
              Object.keys(profile.contacts).map((contactName, index) => {
                return (
                  <Field
                    key={index}
                    name={`contacts.${contactName}`}
                    render={({ input, meta }) => (
                      <label>
                        {`${contactName}`}
                        <Input
                          placeholder={`contacts.${contactName}`}
                          type="text"
                          {...input}
                          autoComplete="off"
                        />
                        {meta.error && meta.touched && (
                          <span className="form-profile__field-error">
                            {meta.error}
                          </span>
                        )}
                      </label>
                    )}
                  />
                );
              })}
            <div className="form-profile__footer">
              <Button
                disabled={submitting || pristine}
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
              <Button onClick={handleEditClick} type="text">
                Cancel
              </Button>
              {submitError && (
                <span className="form-profile__submit-error">
                  {submitError}
                </span>
              )}
            </div>
          </form>
        );
      }}
    />
  );
};

type FormFieldPropsType = {
  name: string;
  type?: string;
  text: string;
  required?: boolean;
};

const FormField: FC<FormFieldPropsType> = ({ name, type, text, required }) => {
  return (
    <Field
      name={name}
      type={type ? type : "text"}
      validate={required ? isRequired : undefined}
      render={({ input, meta }) => {
        return (
          <label className="form-profile__label">
            <div className="form-profile__text">{text}</div>
            {
              <input
                autoComplete="off"
                {...input}
                placeholder={text}
                className="form-profile__input"
                type={type ? type : "text"}
              />
            }
            {meta.error && meta.touched && (
              <span className="form-profile__field-error">{meta.error}</span>
            )}
          </label>
        );
      }}
    />
  );
};

export default ProfileForm;
