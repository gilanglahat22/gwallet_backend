const { response } = require("./responseHandling");

const errorHandling = (err, req, res, next) => {
  const statusCode = err.status;
  const message = err.message;
  response.responses(res, null, statusCode, message);
};

module.exports = { errorHandling };
