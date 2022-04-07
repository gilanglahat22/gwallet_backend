const standardResponse = require("../helper/responseHandle");

const errorHandling = (err, req, res, next) => {
  const statusCode = err.status;
  const message = err.message;
  standardResponse.responses(res, null, statusCode, message);
};

module.exports = { errorHandling };
