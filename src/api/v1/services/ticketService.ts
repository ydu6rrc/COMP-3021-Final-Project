import {ticketDataSample} from "../../../data/ticketData"

// Enum for Priority to meet the assignment requirement
export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

// Also for the status but idk really it's nessary
export enum Status {
  OPEN = "open",
  RESOLVED = "resolved",
  IN_PROGRESS = "in-progress",
}

// Interface for the ticket
export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}

//  Ticket interface for the result
export interface TicketResult {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: string;
  ticketAge: number;
  urgencyScore: number;
  urgencyLevel: string;
}

let tickets: Ticket[] = [...ticketDataSample]

// change to async because it's required
export const getAllTickets = async (): Promise<Ticket[]> => {
  return structuredClone(tickets);
};

export const getTicketById = async (id: number): Promise<TicketResult> => {
  let index: number = tickets.findIndex((ticket: Ticket) => ticket.id === id);
  if (index === -1) {
    throw new Error(`Ticket not found`);
  }
  let foundIndex: Ticket = tickets[index];
  return urgencyCalculation(foundIndex);
};

export const urgencyCalculation = (ticket: Ticket): TicketResult => {
  // calculate the ticket age
  let ticketAgeBySec: number =
    Date.now() - new Date(ticket.createdAt).getTime();
  let ticketAge: number = Math.floor(ticketAgeBySec / (1000 * 60 * 60 * 24));
  // score
  let score: number = 0;
  switch (ticket.priority) {
    case Priority.CRITICAL:
      score = 50;
      break;
    case Priority.HIGH:
      score = 30;
      break;
    case Priority.MEDIUM:
      score = 20;
      break;
    default:
      score = 10;
      break;
  }

  let urgencyScore: number = 0;
  switch (ticket.status) {
    case Status.RESOLVED:
      urgencyScore = 0;
      break;
    default:
      urgencyScore = ticketAge * 5 + score;
  }

  let urgencyLevel: string = "";
  switch (true) {
    case urgencyScore === 0:
      urgencyLevel = "Minimal. Ticket resolved.";
      break;
    case urgencyScore >= 80:
      urgencyLevel = "Critical. Immediate attention required.";
      break;
    case urgencyScore > 50:
      urgencyLevel = "High urgency. Prioritize resolution.";
      break;
    case urgencyScore >= 30:
      urgencyLevel = "Moderate. Schedule for attention.";
      break;
    default:
      urgencyLevel = "Low urgency. Address when capacity allows.";
      break;
  }
  return {
    ...ticket,
    ticketAge: ticketAge,
    urgencyScore: urgencyScore,
    urgencyLevel: urgencyLevel,
  };
};

export const createTicket = async (ticketData: {
  title: string;
  description: string;
  priority: Priority;
}): Promise<Ticket> => {
  const newTicket: Ticket = {
    id: tickets.length + 1,
    title: ticketData.title,
    description: ticketData.description,
    priority: ticketData.priority,
    status: Status.OPEN,
    createdAt: Date.now().toString(),
  };
  tickets.push(newTicket);
  return newTicket;
};

export const updateTicket = async (
  id: number,
  ticketData: Pick<Ticket, "title" | "description" | "priority">,
): Promise<Ticket> => {
  const index: number = tickets.findIndex((ticket: Ticket) => ticket.id === id);
  if (index === -1) {
    throw new Error(`Ticket with ID ${id} not found`);
  }
  tickets[index] = {
    ...tickets[index],
    ...ticketData,
  };
  return structuredClone(tickets[index]);
};

export const deleteTicket = async (id: number): Promise<void> => {
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].id === id) {
      tickets.splice(i, 1);
      break;
    }
  }
  return;
};
