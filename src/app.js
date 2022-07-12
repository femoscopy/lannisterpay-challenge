import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { errorResponse, successResponse } from "./helpers/response";
import { isCelebrateError } from "celebrate";
import { validateTransactionObject } from "./helpers/validation";
import computeTpssFee from "./helpers/tpssCompute";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to LannisterPay TPSS API",
  });
});

// endpoint to compute TPSS for transactions
app.post(
  "/split-payments/compute",
  validateTransactionObject(),
  async (req, res) => {
    const result = computeTpssFee(req.body);
    return successResponse(res, result);
  }
);

app.use("*", (req, res) => {
  return errorResponse(res, "Route / Method not supported", 404);
});

app.use((error, _req, res, next) => {
  if (isCelebrateError(error)) {
    const errorMessage =
      error.details.get("body") ||
      error.details.get("query") ||
      error.details.get("params");

    const message = errorMessage?.message.replace(/"/g, "");
    return errorResponse(res, message);
  }
  next();
});

export default app;
