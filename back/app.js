import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

// disable "X-Powered-By" response header
app.disable("x-powered-by");

// detailed information about requests
app.use(logger("dev"));

// parse JSON body from a request into a JS object
app.use(express.json());

// parse URL-encoded body from a request into a JS object
app.use(express.urlencoded({ extended: false }));

// parse cookie header and populate req.cookies with an object keyed by cookie names
app.use(cookieParser());

// allows requests from different domains, protocols or ports
app.use(cors());

app.use("/", cors(corsOptions), indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
