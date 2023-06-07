import express from "express";
import "express-async-errors";
const app = express();
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import thesesRouter from "./routes/thesesRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import fileRouter from "./routes/filesRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/api/v1", (req, res) => {
  res.send("API route");
});

app.use("/api/v1/files", fileRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/theses", authenticateUser, thesesRouter);
app.use("/api/v1/users", authenticateUser, usersRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
