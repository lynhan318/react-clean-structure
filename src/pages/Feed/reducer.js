import { combineReducers } from "redux";

const d = {
  status: "",
  data: null,
  error: null,
};
export default combineReducers({
  feed_detail: (state = d, action) => {
    switch (action.type) {
      case "get_feed::success": {
        return {
          ...state,
          data: action.payload,
        };
      }

      default:
        return state;
    }
  },
  feed_interaction: (state = d, action) => {
    switch (action.type) {
      case "get_feed::success": {
        return {
          ...state,
          data: action.payload,
        };
      }
      default:
        return state;
    }
  },
});
