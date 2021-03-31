import React, { FC } from "react";
import { Button, Card } from "antd";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/img/avatar.png";
import { ProfilePhotosType, StatusType } from "../../types/types";
import { FollowUnfollowFunctionType } from "./FriendsContainer";

type FriendItemPropsType = {
  name: string;
  id: number;
  followed: boolean;
  status: StatusType;
  photos: ProfilePhotosType;
  unfollowFriend: FollowUnfollowFunctionType;
  followFriend: FollowUnfollowFunctionType;
  shippingProcess: boolean;
  friendshipRequestId: Array<number>;
};

type FollowUnfollowType = () => void;

const FriendItem: FC<FriendItemPropsType> = ({
  name,
  id,
  followed,
  status,
  photos,
  unfollowFriend,
  followFriend,
  shippingProcess,
  friendshipRequestId,
}) => {
  const follow: FollowUnfollowType = () => {
    followFriend(id);
  };
  const unfollow: FollowUnfollowType = () => {
    unfollowFriend(id);
  };
  return (
    <>
      <Card
        hoverable
        style={{
          flex: "0 0 30%",
          padding: "0px 10px",
          marginBottom: "10px",
        }}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link to={`/profile/${id}`} className="friend__avatar">
          <img src={photos.large ? photos.large : defaultAvatar} alt="" />
        </Link>
        <div className="friend__name">{name}</div>
        {status && <div className="friend__name">{status}</div>}
        {followed ? (
          <Button
            onClick={unfollow}
            disabled={shippingProcess && friendshipRequestId.includes(id)}
            type="dashed"
          >
            {shippingProcess && friendshipRequestId.includes(id)
              ? "Unfollowing ..."
              : "Unfollow"}
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={follow}
            disabled={shippingProcess && friendshipRequestId.includes(id)}
          >
            {shippingProcess && friendshipRequestId.includes(id)
              ? "Following..."
              : "Follow"}
          </Button>
        )}
      </Card>
    </>
  );
};

export default FriendItem;
