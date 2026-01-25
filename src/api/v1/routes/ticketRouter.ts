import { Router } from "express";
import { Request, Response } from "express";
import { getAllTickets } from "../controllers/ticketController";

const router = Router();

router.get("/tickets", async (req: Request, res: Response) => {
  await getAllTickets(req, res);
});

export default router;
