import { verifyToken } from "../utils/tokenHelper.js";

const checkAuthorization = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "No está autorizado" });
  }

  const token = authHeader.split(" ")[1];
  const tokenData = verifyToken(token);

  if (tokenData) {
    next();
  } else {
    res.status(498).send({ message: "Token inválido" });
  }
};

export default checkAuthorization;
