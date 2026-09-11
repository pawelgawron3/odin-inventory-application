import "dotenv/config";
import express from "express";
import indexRouter from "./routes/indexRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import productsRouter from "./routes/productsRouter.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`Server is listening for requests on port ${PORT}`);
});
