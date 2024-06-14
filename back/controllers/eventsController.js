import crypto from "node:crypto";
import prisma from "../utils/prisma.js";
import uploadImage from "../utils/cloudinary.js";

export const createEvent = async (req, res) => {
  try {
    req.body.uuid = crypto.randomUUID();

    if (req.files) {
      const uploadResult = await uploadImage(
        "events",
        req.body.uuid,
        req.files.data
      );
      req.body.event_poster_url = uploadResult.secure_url;
    } else {
      req.body.event_poster_url =
        "https://res.cloudinary.com/daxkojrew/image/upload/v1717552459/events/generic_poster.jpg";
    }

    await prisma.events.create({ data: req.body });

    await prisma.$disconnect();

    return res.status(201).json({ message: "Evento creado exitosamente." });
  } catch (error) {
    await prisma.$disconnect();

    return res.status(500).json({ message: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  const allEvents = await prisma.events.findMany({
    select: {
      id: true,
      uuid: true,
      name: true,
      date: true,
      event_poster_url: true,
      celebrities: {
        select: {
          celebrity_alias: true,
          users: {
            select: {
              avatar_url: true,
            },
          },
        },
      },
    },
  });

  await prisma.$disconnect();

  res.status(200).json({
    data: allEvents,
  });
};

export const getAllEventsPaginated = async (req, res) => {
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
};

export const retrieveEventByUUID = async (req, res) => {
  try {
    const eventData = await prisma.events.findUnique({
      where: { uuid: req.query.event_uuid },
      select: {
        uuid: true,
        name: true,
        date: true,
        price: true,
        seats: true,
        about: true,
        location: true,
        event_poster_url: true,
        closed: true,
        celebrity_id: true,
        celebrities: {
          select: {
            celebrity_alias: true,
            users: {
              select: {
                id: true,
                avatar_url: true,
              },
            },
          },
        },
        users: {
          select: {
            users: {
              select: {
                first_name: true,
                last_name: true,
                avatar_url: true,
              },
            },
          },
        },
      },
    });

    await prisma.$disconnect();

    if (!eventData) {
      return res.status(404).json({ message: "Evento no existe." });
    }

    const user_eventData = await prisma.users_events.findFirst({
      where: {
        user_id: Number(req.query.user_id),
        event_uuid: req.query.event_uuid,
      },
    });

    await prisma.$disconnect();

    const isUserRegistered = user_eventData ? true : false;

    res.status(200).json({
      data: { ...eventData, isUserRegistered: isUserRegistered },
    });
  } catch (error) {
    await prisma.$disconnect();

    res
      .status(500)
      .json({ message: "Error al buscar el evento => " + error.message });
  }
};

export const updateEventByUUID = async (req, res) => {
  try {
    if (req.files) {
      const uploadResult = await uploadImage(
        "events",
        req.params.event_uuid,
        req.files.data
      );
      req.body.event_poster_url = uploadResult.secure_url;
    }

    await prisma.events.update({
      where: { uuid: req.params.event_uuid },
      data: req.body,
    });

    await prisma.$disconnect();

    return res
      .status(200)
      .json({ message: "Evento actualizado exitosamente." });
  } catch (error) {
    await prisma.$disconnect();

    return res.status(500).json({ message: error.message });
  }
};

export const closeEvent = async (req, res) => {
  try {
    await prisma.events.update({
      where: { uuid: req.params.event_uuid },
      data: { closed: true },
    });

    await prisma.$disconnect();

    return res.status(200).json({ message: "Evento cerrado exitosamente." });
  } catch (error) {
    await prisma.$disconnect();

    return res.status(500).json({ message: error.message });
  }
};
