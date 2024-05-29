import prisma from "../utils/prisma.js";
import { verifyToken } from "./tokenHelper.js";

const checkRole = async (token, roles) => {
  try {
    const tokenData = verifyToken(token);

    const userData = await prisma.users.findUniqueOrThrow({
      where: { id: tokenData.id },
    });

    await prisma.$disconnect();

    if (roles.includes(userData.role)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(401).json({ message: "No esta autorizado" });
    }
  }
};

export default checkRole;
