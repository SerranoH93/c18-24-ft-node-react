import { Writable } from "node:stream";
import formidable from "formidable";
import { Buffer } from "node:buffer";

const parseMultipartForm = (req, res, next) => {
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
    // Build the request body object from the form fields
    for (const input in fields) {
      req.body[input] = fields[input].toString();
    }

    // If no files are uploaded, continue to the next middleware
    if (Object.keys(files).length === 0) {
      return next();
    }

    if (files.hasOwnProperty("image")) {
      req.files = files.image[0];

      // Concatenate the image data chunks into a single buffer and assign it to req.files.data
      req.files.data = Buffer.concat(buffer);
    }

    next();
  });
};

export default parseMultipartForm;
