// gateway.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// Microservice URLs from .env
const USER_SERVICE = process.env.USER_SERVICE_URL; // e.g., http://localhost:5000/telco
const SIM_SERVICE = process.env.SIM_SERVICE_URL;   // e.g., http://localhost:4000/sim

// Proxy helper
const proxyRequest = async (req, res, target) => {
  try {
    // Construct full URL to target service
    const url = `${target}${req.path}`;
    // console.log("[GATEWAY] Forwarding:", req.method, url);

    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: {
        ...req.headers,
        host: undefined,
        "content-length": undefined,
      },
      timeout: 5000, 
    });

    // Forward response back to client
    res.status(response.status).json(response.data);
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json(err.response.data);
    } else if (err.code === "ECONNREFUSED") {
      res.status(503).json({ status: "fail", msg: "Target service unavailable" });
    } else {
      console.log("[GATEWAY ERROR]", err.message);
      res.status(500).json({ status: "fail", msg: "Gateway error", error: err.message });
    }
  }
};

// Public user routes (signup/login)
app.use("/users", (req, res) => proxyRequest(req, res, USER_SERVICE));

// Protected sim routes (auth handled at SIM service)
app.use("/sims", (req, res) => proxyRequest(req, res, SIM_SERVICE));

// Base route
app.get("/", (req, res) => {
  res.send("API Gateway running");
});

// Start gateway server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`[GATEWAY] Running on port ${PORT}`));
