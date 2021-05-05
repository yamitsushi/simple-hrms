export const set = (payload) => {
  return {
    type: "MESSAGE_SET",
    payload,
  };
};
export const add = (payload) => {
  return {
    type: "MESSAGE_ADD",
    payload,
  };
};
export const update = (payload) => {
  return {
    type: "MESSAGE_UPDATE",
    payload,
  };
};
export const purge = () => {
  return {
    type: "MESSAGE_PURGE",
  };
};
