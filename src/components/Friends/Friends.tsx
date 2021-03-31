import React, { FC } from "react";
import FriendItem from "./FriendItem";
import FriendsNav from "./FriendsNav";
import Preloader from "../Preloader";
import {
  FollowUnfollowFunctionType,
  SearchSubmitType,
} from "./FriendsContainer";
import { FriendType } from "../../types/types";
import FriendsSearchForm from "./FriendsSearchForm";

type FriendsPropsType = {
  friends: Array<FriendType>;
  currentPage: number;
  count: number;
  totalCount: number;
  unfollowFriend: FollowUnfollowFunctionType;
  followFriend: FollowUnfollowFunctionType;
  selectPage: (page: number) => void;
  isLoading: boolean;
  shippingProcess: boolean;
  friendshipRequestId: Array<number>;
  togglePagesRange: (count: number) => void;
  searchFriendsSubmit: SearchSubmitType;
};
const Friends: FC<FriendsPropsType> = ({
  friends,
  currentPage,
  totalCount,
  count,
  unfollowFriend,
  followFriend,
  selectPage,
  isLoading,
  shippingProcess,
  friendshipRequestId,
  togglePagesRange,
  searchFriendsSubmit,
}) => {
  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="friends">
          <FriendsNav
            currentPage={currentPage}
            selectPage={selectPage}
            totalCount={totalCount}
            count={count}
            togglePagesRange={togglePagesRange}
          />
          <FriendsSearchForm searchFriendsSubmit={searchFriendsSubmit} />
          <div className="friends__list">
            {friends.map((friend) => {
              return (
                <FriendItem
                  key={friend.id}
                  {...friend}
                  unfollowFriend={unfollowFriend}
                  followFriend={followFriend}
                  shippingProcess={shippingProcess}
                  friendshipRequestId={friendshipRequestId}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Friends;
