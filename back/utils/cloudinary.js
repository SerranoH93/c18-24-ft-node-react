import { v2 as cloudinary } from "cloudinary";
import process from "node:process";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImage = async (model, uniqueField, fileBuffer) => {
  const result = await new Promise((res, rej) => {
    const options = {};

    switch (model) {
      case "users":
        options.public_id = `${uniqueField}_avatar`;
        break;
      case "celebrities":
        options.public_id = `${uniqueField}_id`;
        break;
      case "events":
        options.public_id = `${uniqueField}_id`;
        break;
    }

    cloudinary.uploader
      .upload_stream(
        {
          ...options,
          folder: model,
          overwrite: true,
        },
        (error, uploadResult) => {
          if (error) {
            return rej(error);
          }

          return res(uploadResult);
        }
      )
      .end(fileBuffer);
  });

  return result;
};

export default uploadImage;
