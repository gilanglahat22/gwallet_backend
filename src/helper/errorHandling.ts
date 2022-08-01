const standardResponse = require("./responseHandling");

const errorHandling = (err:any, req:any, res:any, next:any) => {
  const statusCode = err.status || 500;
  const message = err.message;
  standardResponse.response(res, null, statusCode, message);
};

module.exports = { errorHandling };

export default module;
