import { v2 as cloudinary } from "cloudinary";
import process from "node:process";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadUserAvatar = async (userEmail, fileBuffer) => {
  const result = await new Promise((res, rej) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: `${userEmail}_avatar`,
          folder: "users",
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

export const uploadCelebrityId = async (celebrityAlias, fileBuffer) => {
  const result = await new Promise((res, rej) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: `${celebrityAlias}_id`,
          folder: "celebrities",
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

export const uploadEventPoster = async (eventName, fileBuffer) => {
  const result = await new Promise((res, rej) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: `${eventName}_id`,
          folder: "events",
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
