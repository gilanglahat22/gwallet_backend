const helperNotFoundMessage = (req:any, res:any, next:any) => {
  const statusCode = 404;
  res.status(statusCode);
  res.json({
    status: "Failed",
    code: statusCode,
    data: null,
    message: "URL Not Found"
  });
};

module.exports = { helperNotFoundMessage };

export default module;
