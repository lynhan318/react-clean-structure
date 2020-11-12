const defaultState = {
  status: "",
  data: null,
  error: null,
};
export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case "get_profile::success": {
      return {
        ...state,
        data: payload,
      };
    }

    default:
      return state;
  }
};
