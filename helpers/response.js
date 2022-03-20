module.exports = {
  generateLog: (msg = "Oops! something went wrong") => ({
    type: "log",
    message: msg,
  }),
  generateSuccess: (data) => ({
    type: "success",
    data,
  }),
  generateError: (e = "Oops! something went wrong") => ({
    type: "failed",
    error: e,
  }),
};
