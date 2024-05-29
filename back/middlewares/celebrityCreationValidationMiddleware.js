import celebrityCreationSchema from "../validations/celebrityCreationSchema.js";

const celebrityCreationValidation = async (req, res, next) => {
  const result = await celebrityCreationSchema.safeParseAsync(req.body);

  if (result.success === false) {
    // Only the first error is shown
    return res.status(400).json(result.error.issues[0]);
  }

  next();
};

export default celebrityCreationValidation;
