import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`Server is listening for requests on port ${PORT}`);
});
