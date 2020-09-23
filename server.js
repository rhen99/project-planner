const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const app = express();
connectDB();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/api/projects", require("./routes/api/projects"));

app.use("/api/user", require("./routes/api/user"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
