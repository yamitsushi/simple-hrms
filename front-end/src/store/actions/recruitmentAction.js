export const set = (payload) => {
  return {
    type: "RECRUITMENT_SET",
    payload,
  };
};

export const purge = () => {
  return {
    type: "RECRUITMENT_PURGE",
  };
};
