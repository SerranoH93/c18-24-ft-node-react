import userRegisterSchema from "../validations/userRegisterSchema.js";

const userRegisterValidation = async (req, res, next) => {
  const result = await userRegisterSchema.safeParseAsync(req.body);

  if (result.success === false) {
    // Only the first error is shown
    return res.status(400).json(result.error.issues[0]);
  }

  next();
};

export default userRegisterValidation;
