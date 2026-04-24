const express = require("express");
const cors = require("cors");

const bfhlRoutes = require("./routes/bfhlRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/bfhl", bfhlRoutes);

// Health check (optional but good)
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});