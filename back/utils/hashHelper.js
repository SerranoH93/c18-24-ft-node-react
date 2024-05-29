import bcrypt from "bcryptjs";

const passwordHasher = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
};

export default passwordHasher;
