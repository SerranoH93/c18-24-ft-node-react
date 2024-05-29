import prisma from "../utils/prisma.js";
import bcrypt from "bcryptjs";
import { tokenSign } from "../utils/tokenHelper.js";
import { uploadUserAvatar } from "../utils/cloudinary.js";
import passwordHasher from "../utils/hashHelper.js";

export const login = async (req, res) => {
  try {
    const userData = await prisma.users.findUniqueOrThrow({
      where: {
        email: req.body.email,
      },
    });

    await prisma.$disconnect();

    const dbPassword = userData.password;
    const reqPassword = req.body.password;

    const passwordMatch = await bcrypt.compare(reqPassword, dbPassword);

    if (passwordMatch) {
      const tokenSession = tokenSign(userData);

      return res.status(200).json({
        token: tokenSession,
        user: userData,
      });
    } else {
      return res
        .status(401)
        .json({ message: "Email y/o contraseña incorrecta" });
    }
  } catch (error) {
    await prisma.$disconnect();

    if (error.code === "P2025") {
      return res
        .status(401)
        .json({ message: "Email y/o contraseña incorrecta" });
    }
  }
};

export const register = async (req, res) => {
  try {
    // Validate if the email already exists. This must be done before the user creation because the id_image_url has to be provided by a successful image upload and is required as a key in the req object
    const createdUser = await prisma.users.findUnique({
      where: {
        email: req.body.email,
      },
    });

    await prisma.$disconnect();

    if (createdUser) {
      return res.status(409).json({ message: "Email ya existe" });
    }

    const uploadResult = await uploadUserAvatar(req.body.email, req.files.data);
    req.body.avatar_url = uploadResult.secure_url;

    req.body.password = await passwordHasher(req.body.password);
    req.body.role = "follower";

    await prisma.users.create({
      data: req.body,
    });

    await prisma.$disconnect();

    return res.status(201).json({ message: "Usuario creado" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
