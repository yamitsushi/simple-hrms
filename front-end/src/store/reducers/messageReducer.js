const initialState = [];

const MessageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "MESSAGE_SET":
      return payload;
    case "MESSAGE_ADD":
      return [payload, ...state];
    case "MESSAGE_UPDATE":
      return state.map((item) => (item._id === payload._id ? payload : item));
    case "MESSAGE_PURGE":
      return [];
    default:
      return state;
  }
};

export default MessageReducer;
