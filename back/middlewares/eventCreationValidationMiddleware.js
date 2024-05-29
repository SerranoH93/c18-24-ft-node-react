import eventCreationSchema from "../validations/eventCreationSchema.js";

const eventCreationValidationMiddleware = async (req, res, next) => {
  const result = await eventCreationSchema.safeParseAsync(req.body);

  if (result.success === false) {
    // Only the first error is shown
    return res.status(400).json(result.error.issues[0]);
  }

  next();
};

export default eventCreationValidationMiddleware;
