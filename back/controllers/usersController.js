import prisma from "../utils/prisma.js";
import checkRole from "../utils/roleHelper.js";

export async function findUseryId(req, res) {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];

  const hasRequiredRole = await checkRole(token, ["celebrity", "admin", "follower"]);

  if (!hasRequiredRole) {
    return res.status(401).json({ message: "No está autorizado" });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
    await prisma.$disconnect();
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el usuario", error });
  } 
}

export async function getAllUsersPagination(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  const hasRequiredRole = await checkRole(token, [
    "follower",
    "celebrity",
    "admin",
  ]);

  if (!hasRequiredRole) {
    return res.status(401).json({ message: "No está autorizado" });
  }

  const take = parseInt(req.query.take) || 2;
  const page = parseInt(req.query.page) || 1;

  const skip = (page - 1) * take;

  try {
    const usersData = await prisma.users.findMany({
      skip: skip,
      take: take,
    });

    const totalUsers = await prisma.users.count();

    const totalPages = Math.ceil(totalUsers / take);

    await prisma.$disconnect();

    res.status(200).json({
      success: true,
      pagination: {
        totalUsers: totalUsers,
        totalPages: totalPages,
        currentPage: page,
        perPage: take,
      },
      data: usersData,
    });
  } catch (error) {
    await prisma.$disconnect();
    res.status(500).json({
      success: false,
      message: "Error al obetener los usuarios",
      error: error.message,
    });
  }
}

export async function getAllUsers(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  const hasRequiredRole = await checkRole(token, [
    "follower",
    "celebrity",
    "admin",
  ]);

  if (!hasRequiredRole) {
    return res.status(401).json({ message: "No está autorizado" });
  }

  const usersData = await prisma.users.findMany();

  await prisma.$disconnect();

  res.status(200).json({
    success: true,
    data: usersData,
  });
}
