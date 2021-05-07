export const set = (payload) => {
  return {
    type: "EMPLOYEE_SET",
    payload,
  };
};

export const add = (payload) => {
  return {
    type: "EMPLOYEE_ADD",
    payload,
  };
};

export const remove = (payload) => {
  return {
    type: "EMPLOYEE_REMOVE",
    payload,
  };
};

export const update = (payload) => {
  return {
    type: "EMPLOYEE_UPDATE",
    payload,
  };
};

export const purge = () => {
  return {
    type: "EMPLOYEE_PURGE",
  };
};
