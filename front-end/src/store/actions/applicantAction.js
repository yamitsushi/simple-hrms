export const set = (payload) => {
  return {
    type: "APPLICANT_SET",
    payload,
  };
};

export const add = (payload) => {
  return {
    type: "APPLICANT_ADD",
    payload,
  };
};

export const remove = (payload) => {
  return {
    type: "APPLICANT_REMOVE",
    payload,
  };
};

export const update = (payload) => {
  return {
    type: "APPLICANT_UPDATE",
    payload,
  };
};

export const purge = () => {
  return {
    type: "APPLICANT_PURGE",
  };
};
