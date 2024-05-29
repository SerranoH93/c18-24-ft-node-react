import prisma from "../utils/prisma.js";
import checkRole from "../utils/roleHelper.js";

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
