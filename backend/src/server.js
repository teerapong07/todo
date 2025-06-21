import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import notesRoutes from "./routes/notes.route.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(cors({
  origin:"http://localhost:5173",
}))
app.use(express.json());
app.use(rateLimiter)


// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req Url is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
