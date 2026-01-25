import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as ticketService from "../services/ticketService";

export const getAllTickets = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const tickets: ticketService.Ticket[] = await ticketService.getAllTickets();
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

