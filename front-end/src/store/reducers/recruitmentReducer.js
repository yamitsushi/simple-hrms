const initialState = [];

const RecruitmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "RECRUITMENT_SET":
      return [...state, ...payload];

    case "RECRUITMENT_PURGE":
      return [];

    default:
      return state;
  }
};

export default RecruitmentReducer;
