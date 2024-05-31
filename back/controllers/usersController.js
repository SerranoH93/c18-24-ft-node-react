import prisma from "../utils/prisma.js";
import checkRole from "../utils/roleHelper.js";

export async function getAllUsers(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  const hasRequiredRole = await checkRole(token, [
    "celebrity",
    "admin",
    "follower",
  ]);

  if (!hasRequiredRole) {
    return res.status(401).json({ message: "No está autorizado" });
  }

  const allUsers = await prisma.users.findMany();

  await prisma.$disconnect();

  res.status(200).json({
    data: allUsers,
  });
}

export async function getAllUsersPaginated(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  const hasRequiredRole = await checkRole(token, [
    "celebrity",
    "admin",
    "follower",
  ]);

  if (!hasRequiredRole) {
    return res.status(401).json({ message: "No está autorizado" });
  }

  const take = parseInt(req.query.take) || 10;
  const page = parseInt(req.query.page) || 1;

  const skip = (page - 1) * take;

  try {
    const allUsers = await prisma.users.findMany({
      skip: skip,
      take: take,
    });

    const totalUsers = await prisma.users.count();

    const totalPages = Math.ceil(totalUsers / take);

    await prisma.$disconnect();

    res.status(200).json({
      pagination: {
        totalUsers: totalUsers,
        totalPages: totalPages,
        currentPage: page,
        perPage: take,
      },
      data: allUsers,
    });
  } catch (error) {
    await prisma.$disconnect();

    res.status(500).json({
      message: "Error al obtener los usuarios => " + error.message,
    });
  }
}

export async function retrieveUserById(req, res) {
  const { id } = req.params;

  const token = req.headers.authorization.split(" ")[1];

  const hasRequiredRole = await checkRole(token, [
    "celebrity",
    "admin",
    "follower",
  ]);

  if (!hasRequiredRole) {
    return res.status(401).json({ message: "No está autorizado" });
  }

  try {
    const userData = await prisma.users.findUnique({
      where: { id: parseInt(id) },
    });

    await prisma.$disconnect();

    if (!userData) {
      return res.status(404).json({ message: "Usuario no existe" });
    }

    res.status(200).json({
      data: userData,
    });
  } catch (error) {
    await prisma.$disconnect();

    res
      .status(500)
      .json({ message: "Error al buscar el usuario => " + error.message });
  }
}
