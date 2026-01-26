import { Router } from "express";
import { Request, Response } from "express";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
} from "../controllers/ticketController";

const router = Router();

router.get("/tickets", async (req: Request, res: Response) => {
  await getAllTickets(req, res);
});

router.post("/tickets/", async (req: Request, res: Response) => {
  await createTicket(req, res);
});

router.put("/tickets/:id", async (req: Request, res: Response) => {
  await updateTicket(req, res);
});

router.get("/tickets/:id/urgency", async (req: Request, res: Response) => {
  await getTicketById(req, res);
});

export default router;
