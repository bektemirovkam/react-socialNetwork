import React, { useState, FC } from "react";

import Preloader from "../Preloader";
import ProfileData from "./ProfileParts/ProfileData";
import defaultAvatar from "../../assets/img/avatar.png";
import ProfileForm from "./ProfileParts/ProfileForm";
import { OnSubmitType, ProfileType, StatusType } from "../../types/types";

import { Upload, Button, Row, Col, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";

type ProfilePropsType = {
  profile: ProfileType | null;
  status: StatusType;
  editStatus: (newStatus: { status: StatusType }) => void;
  isLoading: boolean;
  changePhoto: (formData: any) => void;
  editingProfile: (formData: any, form: any, callback: any) => any;
  owner: boolean;
};

const Profile: FC<ProfilePropsType> = ({
  profile,
  status,
  editStatus,
  isLoading,
  changePhoto,
  editingProfile,
  owner,
}) => {
  const [editMode, setEditMode] = useState(false);

  const onSelectedPhoto = (e: any) => {
    const formData = new FormData();
    formData.append("image", e.fileList[0].originFileObj);
    changePhoto(formData);
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const onSubmit: OnSubmitType<ProfileType, ProfileType> = (
    values,
    form,
    callback
  ) => {
    editingProfile(values, form, callback)
      .then(() => {
        setEditMode(!editMode);
      })
      .catch(() => {});
  };
  if (isLoading) {
    return <Preloader />;
  }
  return (
    <Row>
      <Col span={8}>
        <Row>
          <Image
            width={500}
            src={
              profile && profile.photos.large
                ? profile.photos.large
                : defaultAvatar
            }
          />
        </Row>
        <Row>
          {owner && (
            <Upload onChange={onSelectedPhoto} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Upload new photo</Button>
            </Upload>
          )}
        </Row>
      </Col>
      <Col span={12} offset={4}>
        {editMode ? (
          <ProfileForm
            profile={profile}
            handleEditClick={handleEditClick}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            status={status}
            editStatus={editStatus}
            profile={profile}
            owner={owner}
            handleEditClick={handleEditClick}
          />
        )}
      </Col>
    </Row>
  );
};

export default Profile;
