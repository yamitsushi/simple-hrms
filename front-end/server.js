require("dotenv").config({ path: ".env.local" });
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

let listener = app.listen(
  process.env.PORT || 3000,
  process.env.HOST || "127.0.0.1",
  () => {
    console.log(
      `Listening to ${listener.address().address}:${listener.address().port}`
    );
  }
);
