import { Router } from "express";
import { Request, Response } from "express";
import { getAllTickets, getTicketById } from "../controllers/ticketController";

const router = Router();

router.get("/tickets", async (req: Request, res: Response) => {
  await getAllTickets(req, res);
});

router.get("/tickets/:id/urgency", async (req: Request, res: Response) => {
  await getTicketById(req, res);
});


export default router;
