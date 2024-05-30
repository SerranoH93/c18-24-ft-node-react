import prisma from "../utils/prisma.js";
import uploadImage from "../utils/cloudinary.js";

export async function findEventyId(req, res) {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];

  const hasRequiredRole = await checkRole(token, ["celebrity", "admin", "follower"]);

  if (!hasRequiredRole) {
    return res.status(401).json({ message: "No está autorizado" });
  }

  try {
    const event = await prisma.events.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
    await prisma.$disconnect();
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el evento", error });
  } 
}

export async function getEventsPagination(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  const hasRequiredRole = await checkRole(token, [
    "follower",
    "celebrity",
    "admin",
  ]);

  if (!hasRequiredRole) {
    return res.status(401).json({ message: "No está autorizado" });
  }

  const take = parseInt(req.query.take) || 10;
  const page = parseInt(req.query.page) || 1;

  const skip = (page - 1) * take;

  try {
    const eventsData = await prisma.events.findMany({
      skip: skip,
      take: take,
    });

    const totalEvents = await prisma.events.count();

    const totalPages = Math.ceil(totalEvents / take);

    await prisma.$disconnect();

    res.status(200).json({
      success: true,
      pagination: {
        totalUsers: totalEvents,
        totalPages: totalPages,
        currentPage: page,
        perPage: take,
      },
      data: eventsData,
    });
  } catch (error) {
    await prisma.$disconnect();
    res.status(500).json({
      success: false,
      message: "Error al obetener los eventos",
      error: error.message,
    });
  }
}

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
