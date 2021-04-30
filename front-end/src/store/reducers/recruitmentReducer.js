const initialState = [];

const RecruitmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECRUITMENT_SET":
      return [...state, ...action.payload];
    case "RECRUITMENT_PURGE":
      return [];
    default:
      return state;
  }
};

export default RecruitmentReducer;
