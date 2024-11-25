const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser"); // Required for reading cookies
const db = require("./database/db");
const cors = require("cors");

dotenv.config();

const app = express();

//* Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// Enable CORS for all routes

app.use(cors({
  origin: 'http://localhost:5173', // Assuming your frontend is running on port 3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Entry route
const PORT = 4000;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    author: "John Doe",
  });
});

// Routers
app.use("/api/v1/user", require("./routes/auth.router"));
app.use("/api/v1/employee", require("./routes/employee.router"));

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
