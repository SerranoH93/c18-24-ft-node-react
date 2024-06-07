import prisma from "../utils/prisma.js";

export const registerUserEvent = async (req, res) => {
  const userData = await prisma.users.findUnique({
    where: {
      id: req.body.user_id,
    },
  });

  await prisma.$disconnect();

  if (!userData) {
    return res.status(404).json({ message: "Usuario no existe" });
  }

  const eventData = await prisma.events.findUnique({
    where: {
      uuid: req.body.event_uuid,
    },
  });

  await prisma.$disconnect();

  if (!eventData) {
    return res.status(404).json({ message: "Evento no existe" });
  }

  await prisma.users_events.create({
    data: {
      user_id: req.body.user_id,
      event_uuid: req.body.event_uuid,
    },
  });

  await prisma.$disconnect();

  res.status(201).json({ message: "Usuario registrado en el evento" });
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
