const initialState = [];

const JobReducer = (state = initialState, action) => {
  switch (action.type) {
    case "JOB_SET":
      return [...state, ...action.payload];
    case "JOB_ADD":
      return [...state, action.payload];
    case "JOB_UPDATE":
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case "JOB_PURGE":
      return [];
    default:
      return state;
  }
};

export default JobReducer;
