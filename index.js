require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const DB = require("./database");
const blogRoute = require("./Routes/blogRoutes");
const adminRoute = require("./Routes/adminRoutes");
const appointmentRoute = require("./Routes/appointment");
const courseRoute = require("./Routes/courseRoute");
const teamRoute = require("./Routes/teamRoute");
const packageRoute = require("./Routes/packageRoute");
const reviewRoute = require("./Routes/reviewRoutes");
const contactRoute = require("./Routes/contactRoute");
const cookieparser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

DB();
app.use(cookieparser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", blogRoute);
app.use("/", adminRoute);
app.use("/", appointmentRoute);
app.use("/", courseRoute);
app.use("/", reviewRoute);
app.use("/",contactRoute)
// app.use("/", teamRoute);
// app.use("/", packageRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
