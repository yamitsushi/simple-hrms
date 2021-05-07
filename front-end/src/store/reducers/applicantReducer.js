const initialState = [];

const ApplicantReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "APPLICANT_SET":
      return [...state, ...payload];

    case "APPLICANT_ADD":
      return [...state, payload];

    case "APPLICANT_REMOVE":
      return state.filter((item) => item._id !== payload);

    case "APPLICANT_UPDATE":
      return state.map((item) => (item._id === payload._id ? payload : item));

    case "APPLICANT_PURGE":
      return [];

    default:
      return state;
  }
};

export default ApplicantReducer;
