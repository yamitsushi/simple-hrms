const initialState = {
  show: "responsive",
};

const SidebarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SIDEBAR_SET":
      return { ...state, show: payload };

    default:
      return state;
  }
};

export default SidebarReducer;
