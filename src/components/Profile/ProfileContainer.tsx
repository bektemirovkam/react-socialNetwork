import React, { useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import Profile from "./Profile";
import {
  changeAvatar,
  changeProfile,
  editStatus,
  getUserProfile,
  getUserStatus,
} from "../../redux/actions/profile";
import withRedirect from "../../hoc/withRedirect";
import { AppStateType } from "../../redux/reducers";
import { CallbackFormType, ProfileType, StatusType } from "../../types/types";

type ProfileContainerPropsTypes = {
  authUserId: number | null;
};

const ProfileContainer: FC<ProfileContainerPropsTypes> = ({ authUserId }) => {
  const { profile, status, isLoading } = useSelector(
    (state: AppStateType) => state.profile
  );

  let { id }: { id: any } = useParams();

  const { pathname }: { pathname: string } = useLocation();
  const dispatch = useDispatch();

  if (!id) {
    id = authUserId;
  }

  const editingStatus: (newStatus: { status: StatusType }) => void = (
    newStatus
  ) => {
    dispatch(editStatus(newStatus));
  };

  const changePhoto: (formData: {}) => void = (formData) => {
    dispatch(changeAvatar(formData));
  };

  const editingProfile: (
    formData: ProfileType,
    callback: CallbackFormType,
    form?: any
  ) => void = (formData, form, callback) => {
    return dispatch(changeProfile(formData, form, callback));
  };

  useEffect(() => {
    dispatch(getUserProfile(id));
    dispatch(getUserStatus(id));
  }, [pathname]);

  return (
    <Profile
      profile={profile}
      status={status}
      editStatus={editingStatus}
      isLoading={isLoading}
      changePhoto={changePhoto}
      owner={pathname === "/profile" || pathname === "/profile/"}
      editingProfile={editingProfile}
    />
  );
};

export default withRedirect(ProfileContainer);
