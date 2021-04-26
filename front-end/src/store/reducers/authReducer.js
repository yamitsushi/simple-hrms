const initialState = {};

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "AUTH_SET":
      return payload;
    default:
      return state;
  }
};

export default AuthReducer;
