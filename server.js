const express = require("express");
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
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
