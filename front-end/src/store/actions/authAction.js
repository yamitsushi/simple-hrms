export const set = (payload) => {
  return {
    type: "AUTH_SET",
    payload,
  };
};
export const purge = () => {
  return {
    type: "AUTH_PURGE",
  };
};
