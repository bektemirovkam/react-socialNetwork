import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  friendsActions,
  followUnfollowCall,
} from "../../redux/actions/friends";

import Friends from "./Friends";
import { getFriends } from "../../redux/actions/friends";
import { friendsApi } from "../../api/api";
import { AppStateType } from "../../redux/reducers";
import queryString from "querystring";
import { useHistory } from "react-router-dom";

export type FollowUnfollowFunctionType = (id: number) => void;

export type SearchValuesType = {
  term?: string;
  friend?: string;
  page?: number;
};

export type SearchSubmitType = (formData: SearchValuesType) => void;

const FriendsContainer = () => {
  const {
    friends,
    currentPage,
    count,
    totalCount,
    isLoading,
    shippingProcess,
    friendshipRequestId,
    filter,
  } = useSelector((state: AppStateType) => state.friends);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1));
    let actualPage = currentPage;
    let actualFilter = filter;

    if (!!parsed.page) actualPage = Number(parsed.page);

    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string };

    if (!!parsed.friend)
      actualFilter = { ...actualFilter, friend: parsed.friend as string };
    dispatch(getFriends(count, actualPage, actualFilter));
  }, []);

  useEffect(() => {
    const query: SearchValuesType = {};
    if (filter.friend !== "all") query.friend = filter.friend;
    if (!!filter.term) query.term = filter.term;
    if (currentPage !== 1) query.page = currentPage;
    history.push({
      pathname: "/friends",
      search: queryString.stringify(query),
    });
  }, [filter, currentPage]);

  const selectPage: (page: number) => void = (page) => {
    dispatch(friendsActions.setCurrentPage(page));
    dispatch(getFriends(count, page, filter));
  };

  const followFriend: FollowUnfollowFunctionType = (id) => {
    dispatch(
      followUnfollowCall(
        id,
        friendsApi.setFollow.bind(friendsApi),
        friendsActions.follow
      )
    );
  };

  const unfollowFriend: FollowUnfollowFunctionType = (id) => {
    dispatch(
      followUnfollowCall(
        id,
        friendsApi.setUnfollow.bind(friendsApi),
        friendsActions.unfollow
      )
    );
  };

  const searchFriendsSubmit: SearchSubmitType = (formData) => {
    dispatch(getFriends(count, 1, formData));
    dispatch(friendsActions.setFriendFilter(formData));
  };

  const togglePagesRange: (count: number) => void = (count) => {
    dispatch(friendsActions.setCountOnPage(count));
  };

  return (
    <Friends
      friends={friends}
      currentPage={currentPage}
      totalCount={totalCount}
      count={count}
      selectPage={selectPage}
      followFriend={followFriend}
      unfollowFriend={unfollowFriend}
      isLoading={isLoading}
      shippingProcess={shippingProcess}
      friendshipRequestId={friendshipRequestId}
      togglePagesRange={togglePagesRange}
      searchFriendsSubmit={searchFriendsSubmit}
    />
  );
};

export default FriendsContainer;
