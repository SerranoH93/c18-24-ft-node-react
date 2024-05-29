import jwt from "jsonwebtoken";

export const tokenSign = (user) => {
  return jwt.sign(
    {
      id: user.id,
      id_role: user.id_role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return false;
  }
};
