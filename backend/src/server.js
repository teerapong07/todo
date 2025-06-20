import express from "express";
import notesRoutes from "./routes/notes.route.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDb();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req Url is ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
