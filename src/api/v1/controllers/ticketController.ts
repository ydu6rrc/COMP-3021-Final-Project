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
      // gonna need return otherwise the status is 200 not 404
      return;
    }
    res.status(HTTP_STATUS.OK).json(ticket);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

export const createTicket = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      title,
      description,
      priority,
    }: {
      title: string | undefined;
      description: string | undefined;
      priority: string | undefined;
    } = req.body;
    if (!title) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Missing required field: title" });
      return;
    }
    if (!description) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Missing required field: description" });
      return;
    }
    if (
      !priority ||
      !["critical", "high", "medium", "low"].includes(priority.toLowerCase())
    ) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message:
          "Invalid priority. Must be one of: critical, high, medium, low",
      });
      return;
    }
    const newTicket = {
      title,
      description,
      priority: priority.toLocaleLowerCase() as ticketData.Priority,
    };
    const theNewTicket = await ticketService.createTicket(newTicket);
    res.status(HTTP_STATUS.CREATED).json(theNewTicket);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

export const updateTicket = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id: number = Number(req.params.id);
    const {
      priority,
      status,
    }: {
      priority?: string;
      status?: string;
    } = req.body;
    if (priority) {
      if (
        !["critical", "high", "medium", "low"].includes(priority.toLowerCase())
      ) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message:
            "Invalid priority. Must be one of: critical, high, medium, low",
        });
        return;
      }
    }
    if (status) {
      if (!["open", "in-progress", "resolved"].includes(status.toLowerCase())) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message:
            "Invalid status. Must be one of: open, in-progress, resolved",
        });
        return;
      }
    }
    const updateData = {
      priority: ticketData.Priority,
      status: ticketData.Status,
    };
    const updatedTicket = await ticketService.updateTicket(id, updateData);
    if (!updatedTicket) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Ticket not found",
      });
    } else {
      res.status(HTTP_STATUS.OK).json(updatedTicket);
    }
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};
