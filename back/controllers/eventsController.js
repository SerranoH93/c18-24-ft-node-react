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

    await prisma.events.create({ data: req.body });

    await prisma.$disconnect();

    return res.status(201).json({ message: "Evento creado" });
  } catch (error) {
    await prisma.$disconnect();

    return res.status(500).json({ message: error.message });
  }
};

export async function getAllEventsPaginated(req, res) {
  const take = parseInt(req.query.take) || 10;
  const page = parseInt(req.query.page) || 1;

  const skip = (page - 1) * take;

  try {
    const allEvents = await prisma.events.findMany({
      skip: skip,
      take: take,
    });

    const totalEvents = await prisma.events.count();

    const totalPages = Math.ceil(totalEvents / take);

    await prisma.$disconnect();

    res.status(200).json({
      pagination: {
        totalEvents: totalEvents,
        totalPages: totalPages,
        currentPage: page,
        perPage: take,
      },
      data: allEvents,
    });
  } catch (error) {
    await prisma.$disconnect();

    res.status(500).json({
      message: "Error al obtener los eventos => " + error.message,
    });
  }
}

export async function retrieveEventById(req, res) {
  const { id } = req.params;

  try {
    const eventData = await prisma.events.findUnique({
      where: { id: parseInt(id) },
    });

    await prisma.$disconnect();

    if (!eventData) {
      return res.status(404).json({ message: "Evento no existe" });
    }

    res.status(200).json({
      data: eventData,
    });
  } catch (error) {
    await prisma.$disconnect();

    res
      .status(500)
      .json({ message: "Error al buscar el evento => " + error.message });
  }
}
