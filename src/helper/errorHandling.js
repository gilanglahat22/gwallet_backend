const standardResponse = require("./responseHandling");

const errorHandling = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message;
  standardResponse.response(res, null, statusCode, message);
};

module.exports = { errorHandling };
