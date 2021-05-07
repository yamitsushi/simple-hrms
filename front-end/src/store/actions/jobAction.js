export const set = (payload) => {
  return {
    type: "JOB_SET",
    payload,
  };
};

export const add = (payload) => {
  return {
    type: "JOB_ADD",
    payload,
  };
};

export const update = (payload) => {
  return {
    type: "JOB_UPDATE",
    payload,
  };
};

export const purge = () => {
  return {
    type: "JOB_PURGE",
  };
};
