import { FriendType } from "../../types/types";
import { arrMapping } from "../../utils/arrMapping";
import { FriendsActionsTypes } from "../actions/friends";

const initialState = {
  friends: [] as Array<FriendType>,
  currentPage: 1,
  count: 50,
  totalCount: 0,
  isLoading: false,
  shippingProcess: false,
  friendshipRequestId: [] as Array<number>,
  filter: {
    term: "",
    friend: "all",
  },
};

type iniStateType = typeof initialState;

const friendsReducer = (
  state = initialState,
  action: FriendsActionsTypes
): iniStateType => {
  switch (action.type) {
    case "SET_FRIENDS": {
      return {
        ...state,
        friends: [...action.friends],
        totalCount: action.totalCount,
      };
    }
    case "SET_FRIEND_FILTER": {
      const term = action.payload.term ? action.payload.term : "";
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
          term,
        },
      };
    }
    case "SET_COUNT_ON_PAGE":
    case "SET_FRIENDS_LOADING":
    case "SET_CURRENT_PAGE": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "SET_SHIPPING_PROCCESS": {
      return {
        ...state,
        shippingProcess: action.shipping,
        friendshipRequestId: action.shipping
          ? [...state.friendshipRequestId, action.friendId]
          : state.friendshipRequestId.filter((id) => id !== action.friendId),
      };
    }
    case "FOLLOW": {
      return {
        ...state,
        friends: arrMapping(state.friends, "id", action.payload, {
          followed: true,
        }),
      };
    }
    case "UNFOLLOW": {
      return {
        ...state,
        friends: arrMapping(state.friends, "id", action.payload, {
          followed: false,
        }),
      };
    }
    default: {
      return state;
    }
  }
};

export default friendsReducer;
