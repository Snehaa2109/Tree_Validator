require("dotenv").config();

const cors = require("cors");

const bfhlRoutes = require("./routes/bfhlRoutes");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  })
);
// Middlewares
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