import { ThunkAction } from "redux-thunk";
import { friendsApi } from "../../api/api";
import { SearchValuesType } from "../../components/Friends/FriendsContainer";
import { GetUsersResponseType, ResultCodesEnum } from "../../types/types";
import { AppStateType } from "../reducers";

export const friendsActions = {
  setLoading: (isLoading: boolean) => {
    return {
      type: "SET_FRIENDS_LOADING",
      payload: { isLoading },
    } as const;
  },
  setFriends: (data: GetUsersResponseType) => {
    return {
      type: "SET_FRIENDS",
      friends: data.items,
      totalCount: data.totalCount,
    } as const;
  },
  setShipProcess: (value: boolean, id: number) => {
    return {
      type: "SET_SHIPPING_PROCCESS",
      shipping: value,
      friendId: id,
    } as const;
  },
  follow: (id: number) => {
    return {
      type: "FOLLOW",
      payload: id,
    } as const;
  },
  unfollow: (id: number) => {
    return {
      type: "UNFOLLOW",
      payload: id,
    } as const;
  },
  setCurrentPage: (currentPage: number) => {
    return {
      type: "SET_CURRENT_PAGE",
      payload: { currentPage },
    } as const;
  },
  setFriendFilter: (filter: SearchValuesType) => {
    return {
      type: "SET_FRIEND_FILTER",
      payload: filter,
    } as const;
  },
  setCountOnPage: (count: number) => {
    return {
      type: "SET_COUNT_ON_PAGE",
      payload: { count },
    } as const;
  },
};

type ActionCreatorsTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type FriendsActionsTypes = ReturnType<
  ActionCreatorsTypes<typeof friendsActions>
>;

type ThunkAcionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  FriendsActionsTypes
>;

export const getFriends = (
  count: number,
  currentPage: number,
  filter: {
    term?: string;
    friend?: string;
  }
): ThunkAcionType => async (dispatch) => {
  dispatch(friendsActions.setLoading(true));
  dispatch(friendsActions.setCurrentPage(currentPage));
  dispatch(friendsActions.setFriendFilter(filter));
  const data = await friendsApi.getFriends(
    count,
    currentPage,
    filter.term,
    filter.friend
  );
  dispatch(friendsActions.setFriends(data));
  dispatch(friendsActions.setLoading(false));
};

export const followUnfollowCall = (
  id: number,
  apiMethod: Function,
  action: (id: number) => FriendsActionsTypes
): ThunkAcionType => async (dispatch) => {
  dispatch(friendsActions.setShipProcess(true, id));
  const data = await apiMethod(id);
  if (data.resultCode === ResultCodesEnum.success) {
    dispatch(action(id));
  }
  dispatch(friendsActions.setShipProcess(false, id));
};
