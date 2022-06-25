export const initialState = {
  loading: false,
  data: [],
  userData: {},
  error: "",
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        userData: {},
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.data,
        userData: {},
        error: "",
      };
    case "FETCH_DATA_ERROR":
      return {
        ...state,
        loading: false,
        data: [],
        userData: {},
        error: action.payload,
      };
    case "ADD_IMAGE":
      return {
        ...state,
        loading: false,
        userData: action.userData,
        error: "",
      };
    case "REMOVE_IMAGE":
      return {
        ...state,
        loading: false,
        userData: action.userData,
        error: "",
      };
    case "EDIT_IMAGE":
      return {
        ...state,
        loading: false,
        userData: action.userData,
        error: "",
      };
    case "ADD_USER":
      return {
        ...state,
        loading: false,
        userData: action.userData,
        error: "",
      };
    case "REMOVE_USER":
      return {
        ...state,
        loading: false,
        userData: {},
        error: "",
      };
    default:
      return state;
  }
};
export default reducer;
