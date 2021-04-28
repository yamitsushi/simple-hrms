const initialState = [];

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EMPLOYEE_SET":
      return [...state, ...action.payload];
    case "EMPLOYEE_ADD":
      return [...state, action.payload];
    case "EMPLOYEE_REMOVE":
      return state.filter((item) => item._id !== action.payload);
    case "EMPLOYEE_UPDATE":
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case "EMPLOYEE_PURGE":
      return [];
    default:
      return state;
  }
};

export default EmployeeReducer;
