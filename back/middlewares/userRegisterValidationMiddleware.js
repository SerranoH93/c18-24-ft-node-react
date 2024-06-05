import userRegisterSchema from "../validations/userRegisterSchema.js";

const userRegisterValidation = async (req, res, next) => {
  const result = await userRegisterSchema.safeParseAsync(req.body);

  if (result.success === false) {
    // Only the first error is shown
    return res.status(400).json(result.error.issues[0]);
  }

  req.body = result.data;

  if (!req.hasOwnProperty("files")) {
    return next();
  }

  const supportedImageFormats = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  if (!supportedImageFormats.includes(req.files.mimetype)) {
    return res.status(400).json({
      message:
        "Formato de imagen no válido. Solo se permiten JPEG, JPG, PNG y WEBP.",
    });
  }

  if (req.files.size > 5 * 1024 * 1024) {
    return res.status(400).json({
      message: "El tamaño de la imagen no debe exceder los 5MB.",
    });
  }

  next();
};

export default userRegisterValidation;
