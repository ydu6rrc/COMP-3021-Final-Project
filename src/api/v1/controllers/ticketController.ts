import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as ticketService from "../services/ticketService";
import * as ticketData from "../../../data/ticketData";

export const getAllTickets = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const tickets: ticketData.Ticket[] = await ticketService.getAllTickets();
    res
      .status(HTTP_STATUS.OK)
      .json({ message: "Get all tickets", data: tickets });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

export const getTicketById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id: number = Number(req.params.id);
    const ticket: ticketData.TicketResult | undefined =
      await ticketService.getTicketById(id);
    if (!ticket) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found." });
    }
    res.status(HTTP_STATUS.OK).json(ticket);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};
