import "dotenv/config";
import express from "express";
import homeRouter from "./routes/homeRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import productsRouter from "./routes/productsRouter.js";
import originRouter from "./routes/originRouter.js";

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

app.use("/", homeRouter);
app.use("/categories", categoryRouter);
app.use("/products", productsRouter);
app.use("/origins", originRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`Server is listening for requests on port ${PORT}`);
});
