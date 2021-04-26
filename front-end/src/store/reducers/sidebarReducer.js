const initialState = {
  show: "responsive",
};

const SidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIDEBAR_SET":
      return { ...state, show: action.payload };
    default:
      return state;
  }
};

export default SidebarReducer;
