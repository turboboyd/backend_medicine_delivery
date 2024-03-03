require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const drugRoutes = require("./routes/api/drugRoutes");
const storeRoutes = require("./routes/api/storeRoutes");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/drug-stores", drugRoutes);
app.use("/api/stores", storeRoutes);


app.get("/test-error", (req, res, next) => {
  const err = new Error("Тестовая ошибка");
  err.status = 400; // Вы можете установить любой статус-код ошибки
  next(err);
});


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});


app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
