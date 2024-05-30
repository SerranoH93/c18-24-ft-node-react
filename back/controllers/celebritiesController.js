import prisma from "../utils/prisma.js";
import { uploadCelebrityId } from "../utils/cloudinary.js";
import checkRole from "../utils/roleHelper.js";

export const createCelebrity = async (req, res) => {
  try {
    const { email, user_id, celebrity_alias, first_name, last_name } = req.body;
    
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(user_id),
      },
    });

    if (!user || user.email !== email) {
      await prisma.$disconnect();
      return res.status(400).json({ message: "El ID de usuario y el correo electrónico no coinciden." });
    }

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

    const uploadResult = await uploadCelebrityId(
      req.body.celebrity_alias,
      req.files.data
    );
    req.body.id_image_url = uploadResult.secure_url;

    await prisma.users.update({
      where: {
        email: req.body.email,
      },
      data: {
        role: "celebrity",
      },
    });

    await prisma.$disconnect();

    if (req.body.first_name) {
      await prisma.users.update({
        where: {
          email: req.body.email,
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
          email: req.body.email,
        },
        data: {
          last_name: req.body.last_name,
        },
      });

      await prisma.$disconnect();

      delete req.body.last_name;
    }

    delete req.body.email;

    req.body.user_id = Number(req.body.user_id);

    await prisma.celebrities.create({
      data: req.body,
    });

    await prisma.$disconnect();

    return res.status(201).json({ message: "Celebridad creada" });
  } catch (error) {
    await prisma.$disconnect();

    return res.status(400).json({ message: error.message });
  }
};

export async function getAllCelebrities(req, res) {
  const usersCelebrities = await prisma.celebrities.findMany();

  await prisma.$disconnect();

  res.status(200).json({
    success: true,
    data: usersCelebrities,
  });
}

export async function findEventById(req, res) {
  const { id } = req.params;

  try {
    const celebrity = await prisma.celebrities.findUnique({
      where: { id: parseInt(id) },
    });

    if (!celebrity) {
      return res.status(404).json({ message: "Celebridad no encontrada" });
    }

    res.status(200).json({
      success: true,
      data: celebrity,
    });

    await prisma.$disconnect();
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el celebridad", error });
  }
}
