const initialState = [];

const MessageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "MESSAGE_SET":
      return payload;
    case "MESSAGE_ADD":
      return [...state, payload];
    case "MESSAGE_PURGE":
      return [];
    default:
      return state;
  }
};

export default MessageReducer;
