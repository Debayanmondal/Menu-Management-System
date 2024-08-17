// Async handler function to catch errors in asynchronous routes
const asyncHandler = (fn) => (req, res, next) => {
  // Handle errors in asynchronous route handlers by catching promises
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
