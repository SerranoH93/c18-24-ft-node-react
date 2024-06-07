import prisma from "../utils/prisma.js";
import uploadImage from "../utils/cloudinary.js";

export const createCelebrity = async (req, res) => {
  try {
    // Validate if the celebrity alias already exists. This must be done before the celebrity creation because the id_image_url has to be provided by a successful image upload and is required as a key in the req object
    const createdCelebrity = await prisma.celebrities.findUnique({
      where: {
        celebrity_alias: req.body.celebrity_alias,
      },
    });

    await prisma.$disconnect();

    if (createdCelebrity) {
      return res.status(409).json({ message: "Celebridad ya existe" });
    }

    const uploadResult = await uploadImage(
      "celebrities",
      req.body.celebrity_alias,
      req.files.data
    );
    req.body.id_image_url = uploadResult.secure_url;

    await prisma.users.update({
      where: {
        id: req.body.user_id,
      },
      data: {
        role: "celebrity",
      },
    });

    await prisma.$disconnect();

    if (req.body.first_name) {
      await prisma.users.update({
        where: {
          id: req.body.user_id,
        },
        data: {
          first_name: req.body.first_name,
        },
      });

      await prisma.$disconnect();

      delete req.body.first_name;
    }

    if (req.body.last_name) {
      await prisma.users.update({
        where: {
          id: req.body.user_id,
        },
        data: {
          last_name: req.body.last_name,
        },
      });

      await prisma.$disconnect();

      delete req.body.last_name;
    }

    await prisma.celebrities.create({
      data: req.body,
    });

    await prisma.$disconnect();

    return res.status(201).json({ message: "Celebridad creada" });
  } catch (error) {
    await prisma.$disconnect();

    return res.status(500).json({ message: error.message });
  }
};

export const getAllCelebrities = async (req, res) => {
  const allCelebrities = await prisma.celebrities.findMany();

  await prisma.$disconnect();

  res.status(200).json({ data: allCelebrities });
};

export const retrieveCelebrityById = async (req, res) => {
  const { id } = req.params;

  try {
    const celebrityData = await prisma.celebrities.findUnique({
      where: { id: parseInt(id) },
    });

    await prisma.$disconnect();

    if (!celebrityData) {
      return res.status(404).json({ message: "Celebridad no existe" });
    }

    res.status(200).json({
      data: celebrityData,
    });
  } catch (error) {
    await prisma.$disconnect();

    res
      .status(500)
      .json({ message: "Error al buscar la celebridad => " + error.message });
  }
};
