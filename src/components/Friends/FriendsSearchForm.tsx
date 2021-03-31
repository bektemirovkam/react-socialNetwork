import React, { FC } from "react";
import { Field, Form } from "react-final-form";
import { OnSubmitType } from "../../types/types";
import { SearchSubmitType, SearchValuesType } from "./FriendsContainer";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/reducers";
import { Input, Select, Button } from "antd";

type FriendsSearchFormPropsType = {
  searchFriendsSubmit: SearchSubmitType;
};

const { Option } = Select;

const FriendsSearchForm: FC<FriendsSearchFormPropsType> = React.memo(
  ({ searchFriendsSubmit }) => {
    const onSubmit: OnSubmitType<SearchValuesType, SearchValuesType> = (
      formData
    ) => {
      searchFriendsSubmit(formData);
    };
    const filter = useSelector((state: AppStateType) => ({
      ...state.friends.filter,
    }));
    return (
      <div className="search">
        <Form
          onSubmit={onSubmit}
          initialValues={filter}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="search__form">
              <Field name="term" defaultValue="">
                {({ input }) => {
                  return (
                    <div>
                      <Input
                        placeholder="Введите имя пользователя"
                        type="text"
                        {...input}
                        autoComplete="off"
                      />
                    </div>
                  );
                }}
              </Field>
              <Field name="friend" defaultValue="all">
                {({ input }) => {
                  return (
                    <div>
                      <Select style={{ width: 120 }} {...input}>
                        <Option value="all">All</Option>
                        <Option value="true">Follows</Option>
                        <Option value="false">Unfollows</Option>
                      </Select>
                    </div>
                  );
                }}
              </Field>
              <Button htmlType="submit" type="primary">
                Search
              </Button>
            </form>
          )}
        />
      </div>
    );
  }
);

export default FriendsSearchForm;
