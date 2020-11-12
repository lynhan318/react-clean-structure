const defaultState = {
  status: "",
  data: null,
  error: null,
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case "get_home::success": {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
};
