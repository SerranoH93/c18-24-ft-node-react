import loginSchema from "../validations/loginSchema.js";

const loginValidation = async (req, res, next) => {
  const result = await loginSchema.safeParseAsync(req.body);

  if (result.success === false) {
    // Only the first error is shown
    return res.status(400).json(result.error.issues[0]);
  }

  next();
};

export default loginValidation;
