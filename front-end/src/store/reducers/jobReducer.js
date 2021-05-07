const initialState = [];

const JobReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "JOB_SET":
      return [...state, ...payload];

    case "JOB_ADD":
      return [...state, payload];

    case "JOB_UPDATE":
      return state.map((item) => (item._id === payload._id ? payload : item));

    case "JOB_PURGE":
      return [];

    default:
      return state;
  }
};

export default JobReducer;
