const initialState = [];

const EmployeeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "EMPLOYEE_SET":
      return [...state, ...payload];

    case "EMPLOYEE_ADD":
      return [...state, payload];

    case "EMPLOYEE_REMOVE":
      return state.filter((item) => item._id !== payload);

    case "EMPLOYEE_UPDATE":
      return state.map((item) => (item._id === payload._id ? payload : item));

    case "EMPLOYEE_PURGE":
      return [];

    default:
      return state;
  }
};

export default EmployeeReducer;
