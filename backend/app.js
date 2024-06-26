const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const authRouter = require("./routers/AuthRouter");
const photoRouter = require("./routers/photoRouter");
const categoryRouter = require("./routers/categoryRouter");

require("dotenv").config();

const { PORT } = process.env;
const port = PORT || 3000;

app.use(cors("*"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use("/auth", authRouter);
app.use("/photos", photoRouter);
app.use("/categories", categoryRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
