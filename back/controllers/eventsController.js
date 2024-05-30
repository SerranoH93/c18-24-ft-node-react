import prisma from "../utils/prisma.js";
import uploadImage from "../utils/cloudinary.js";

export const createEvent = async (req, res) => {
  try {
    // Validate if the event name already exists. This must be done before the event creation because the event_poster_url has to be provided by a successful image upload and is required as a key in the req object
    const createdEvent = await prisma.events.findUnique({
      where: { name: req.body.name },
    });

    await prisma.$disconnect();

    if (createdEvent) {
      return res.status(409).json({ message: "Evento ya existe" });
    }

    if (req.files) {
      const uploadResult = await uploadImage(
        "events",
        req.body.name,
        req.files.data
      );
      req.body.event_poster_url = uploadResult.secure_url;
    }

    req.body.celebrity_id = Number(req.body.celebrity_id);

    await prisma.events.create({ data: req.body });

    await prisma.$disconnect();

    return res.status(201).json({ message: "Evento creado" });
  } catch (error) {
    await prisma.$disconnect();

    return res.status(400).json({ message: error.message });
  }
};
