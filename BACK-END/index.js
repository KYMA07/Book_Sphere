import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./src/database/database.js";

import bookRoutes from "./src/routes/bookRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import borrowRoutes from "./src/routes/borrowRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use("/books", bookRoutes);
app.use("/user", userRoutes);
app.use("/borrow", borrowRoutes);

const PORT = process.env.PORT || 3306;

sequelize.sync()
  .then(() => console.log('Database connected and synced'))
  .catch(err => console.error('Database sync error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
