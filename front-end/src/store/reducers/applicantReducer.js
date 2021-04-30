const initialState = [];

const ApplicantReducer = (state = initialState, action) => {
  switch (action.type) {
    case "APPLICANT_SET":
      return [...state, ...action.payload];
    case "APPLICANT_ADD":
      return [...state, action.payload];
    case "APPLICANT_REMOVE":
      return state.filter((item) => item._id !== action.payload);
    case "APPLICANT_UPDATE":
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case "APPLICANT_PURGE":
      return [];
    default:
      return state;
  }
};

export default ApplicantReducer;
