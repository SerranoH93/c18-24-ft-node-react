import { Writable } from "node:stream";
import formidable from "formidable";
import { Buffer } from "node:buffer";

const parseFormMultipart = (req, res, next) => {
  // Extract image data chunks from the multipart form and save in an array
  const extractImageData = (buffer) => {
    const writable = new Writable({
      write: (chunk, _enc, next) => {
        buffer.push(chunk);
        next();
      },
    });

    return writable;
  };

  const buffer = [];

  // Avoid temporary files creation through image data chunks extraction
  const options = { fileWriteStreamHandler: () => extractImageData(buffer) };

  const form = formidable(options);

  form.parse(req, (error, fields, files) => {
    if (!("file" in files)) {
      return res.status(400).json({
        message: "Debe seleccionar un archivo de imagen.",
      });
    }

    if (files.file.length > 1) {
      return res.status(400).json({
        message: "Solo puede subirse una imagen.",
      });
    }

    const supportedFormats = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];

    const image = files.file[0];

    if (!supportedFormats.includes(image.mimetype)) {
      return res.status(400).json({
        message:
          "Formato de imagen no válido. Solo se permiten JPEG, JPG, PNG y WEBP.",
      });
    }

    if (image.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        message: "El tamaño de la imagen no debe exceder los 5MB.",
      });
    }

    req.files = image;
    // Concatenate the image data chunks into a single buffer
    req.files.data = Buffer.concat(buffer);

    // Build the request body object from the form fields
    for (const input in fields) {
      req.body[input] = fields[input].toString();
    }

    next();
  });
};

export default parseFormMultipart;
