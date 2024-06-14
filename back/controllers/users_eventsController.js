import prisma from "../utils/prisma.js";

export const registerUserEvent = async (req, res) => {
  const userData = await prisma.users.findUnique({
    where: {
      id: Number(req.body.user_id),
    },
  });

  await prisma.$disconnect();

  if (!userData) {
    return res.status(404).json({ message: "Usuario no existe." });
  }

  const eventData = await prisma.events.findUnique({
    where: {
      uuid: req.body.event_uuid,
    },
    select: {
      users: true,
    },
  });

  await prisma.$disconnect();

  if (!eventData) {
    return res.status(404).json({ message: "Evento no existe." });
  }

  const userEventData = await prisma.users_events.findFirst({
    where: {
      user_id: Number(req.body.user_id),
      event_uuid: req.body.event_uuid,
    },
  });

  await prisma.$disconnect();

  if (userEventData) {
    return res
      .status(409)
      .json({ message: "Usuario ya registrado en el evento." });
  }

  if (eventData.closed) {
    return res
      .status(404)
      .json({ message: "Evento no admite nuevos registros." });
  }

  if (eventData.users.length > eventData.seats) {
    return res.status(404).json({ message: "Evento sin cupos disponibles." });
  }

  await prisma.users_events.create({
    data: {
      user_id: Number(req.body.user_id),
      event_uuid: req.body.event_uuid,
    },
  });

  await prisma.$disconnect();

  res
    .status(201)
    .json({ message: "Usuario registrado en el evento exitosamente." });
};

export const getAllUserEvents = async (req, res) => {
  const userEventsData = await prisma.users_events.findMany({
    where: {
      user_id: Number(req.params.user_id),
    },
    select: {
      events: {
        select: {
          uuid: true,
          name: true,
          location: true,
          event_poster_url: true,
          celebrities: {
            select: {
              celebrity_alias: true,
            },
          },
        },
      },
    },
  });

  await prisma.$disconnect();

  res.status(200).json({ data: userEventsData });
};
