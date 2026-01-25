import express, { Express } from "express";
import morgan from "morgan";
// TODO test will delete lately
import { getAllTickets, getTicketById } from "./api/v1/services/ticketService";
const app: Express = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Health Check
app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// TODO test will delete lately
app.get("/api/v1/tickets", async (req, res) => {
  const data = await getAllTickets();
  res.json(data);
});

// TODO JUST TEST
app.get("/api/v1/tickets/:id", async (req, res) => {
  const id = Number(req.params.id);
  const ticket = await getTicketById(id);
  res.json(ticket);
});

export default app;
