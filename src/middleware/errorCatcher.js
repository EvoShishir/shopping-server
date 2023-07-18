const errorCatcherMiddleware = (err, req, res, next) => {
  const message = err.message ? err.message : "Internal Server Error";

  res.status(500).json({
    success: false,
    error: message,
  });
};

module.exports = errorCatcherMiddleware;
