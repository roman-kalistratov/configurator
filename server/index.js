import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index.js";
const app = express();

//middlewares
app.use(
  cors({ origin: true, methods: "GET,POST,PUT,DELETE", credentials: true })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", routes);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Connected to Server, Port: ${PORT}`);
});
