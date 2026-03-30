import type { Express } from "express";
import express from "express";
import morgan from "morgan";
import ticketRouter from "./api/v1/routes/ticketRouter";

const app: Express = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.use(express.json());
app.use("/api/v1", ticketRouter);

// Health Check
app.get("/api/v1/health", (req, res) => {
	res.json({
		status: "OK",
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
		version: "1.0.0",
	});
});

export default app;
