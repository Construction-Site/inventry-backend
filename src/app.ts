import express from "express";
import { Request, Response, NextFunction } from "express";
const app = express();
import helmet from "helmet";
import bodyParser from "body-parser";
import connectorDb from "./Helper/Dbconnector";
import * as dotenv from "dotenv";
import InventryRouter from "./Routes/InventryRoute";
import OrderRouter from "./Routes/OrderRoute"
import morgan from "morgan";
import health from "./Routes/health";
import cors from "cors";
dotenv.config();
app.use(cors())
app.use(helmet());
app.use(bodyParser.json());
//morgan used for logging
// app.use(morgan("dev"));
app.use(morgan<Request, Response>("dev"));

const dbConnectionString: string = "mongodb+srv://test:test@cluster0.2xnfc.mongodb.net/?retryWrites=true&w=majority";
const server_port = process.env.PORT 

connectorDb(dbConnectionString);

//user route
app.use("/",health);
app.use("/inventry", InventryRouter);
app.use("/order", OrderRouter);

//404 response

const sendResponse = (req: Request, res: Response, result: any) => {
  const responseObject = {
    status: 200,
    result: {
      statusCode: 200,
      data: result,
    },
  };
  res.status(responseObject.status);
  res.send(responseObject.result);
};

const sendError = (req: Request, res: Response, error: any) => {
  const result = error.getErrorObject ? error.getErrorObject() : {
    code: 500,
  };
  res.status(result.code);
  res.send(result);
};

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    sendError(req, res, err);
  } else {
    sendResponse(req, res, err);
  }
});

app.use((error: any, res: Response, next: NextFunction) => {
  try {
    const status = error.status || 500;
    const message =
      error.message ||
      "There was an error while processing your request, please try again";
    return res.status(status).send({
      status,
      message,
    });
  } catch (error) {
    next(error);
  }
});
const port = server_port || 8000;
app.listen(port, () => {
  console.log(`Application started on ${port}...`);
});

export default app;
