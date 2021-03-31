import React, { FC } from "react";

import Status from "./Status";
import { ProfileType, StatusType } from "../../../types/types";

import { Avatar, Button, Row, Tabs } from "antd";
import { TrademarkOutlined, EditOutlined } from "@ant-design/icons";

type ProfileDataPropsType = {
  status: StatusType;
  editStatus: (newStatus: { status: StatusType }) => void;
  profile: ProfileType | null;
  owner: boolean;
  handleEditClick: () => void;
};

const ProfileData: FC<ProfileDataPropsType> = ({
  status,
  editStatus,
  profile,
  owner,
  handleEditClick,
}) => {
  const { TabPane } = Tabs;
  return (
    <div className="profile">
      <Status status={status} editStatus={editStatus} owner={owner} />
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="About me" key="1">
          <div className="profile__name">{profile && profile.fullName}</div>
          <div className="profile__about">{profile && profile.aboutMe}</div>
          <div className="profile__job">
            {profile && profile.lookingForAJob && (
              <Avatar icon={<TrademarkOutlined />} />
            )}
          </div>
          <div className="profile__job-descr">
            {profile && profile.lookingForAJobDescription}
          </div>
        </TabPane>
        <TabPane tab="Contacts" key="2">
          <ul>
            {profile &&
              Object.keys(profile.contacts).map((contactName, index) => {
                return (
                  <Contact
                    key={index}
                    name={contactName}
                    value={profile.contacts[contactName]}
                  />
                );
              })}
          </ul>
        </TabPane>
      </Tabs>
      {owner && (
        <EditOutlined
          onClick={handleEditClick}
          style={{ fontSize: "20px" }}
          className="profile__edit"
        />
      )}
    </div>
  );
};

type ContactPropsType = {
  name: string;
  value: string | null | undefined;
};

const Contact: FC<ContactPropsType> = ({ name, value }) => {
  return value ? (
    <li>
      <span>{name + " :  "}</span>
      <Button type="link" href={value}>
        {value && " " + value}
      </Button>
    </li>
  ) : null;
};

export default ProfileData;
