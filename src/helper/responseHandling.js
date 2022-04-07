const response = (res, result, status, message, pagination) => {
  const statusMessage = () => {
    if (
      status === 200 ||
      status === 201 ||
      status === 202 ||
      status === 203 ||
      status === 204
    ) {
      return "Success";
    } else {
      return "Failed";
    }
  };
  res.status(status);
  res.json({
    status: statusMessage(),
    code: status,
    data: result,
    message: message || null,
    pagination: pagination
  });
};

module.exports = { response };
