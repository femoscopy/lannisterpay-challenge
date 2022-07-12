export const errorResponse = (
  res,
  message = "NOT VALID",
  status = 400,
  data = {}
) => {
  return res.status(status).json({
    status: "NOT OK",
    message,
    data,
  });
};

export const successResponse = (res, data = {}) => {
  return res.status(200).json(data);
};
