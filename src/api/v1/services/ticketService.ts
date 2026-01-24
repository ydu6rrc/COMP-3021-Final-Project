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
// Mock date for sample
const get_created_day_before = (day: number) => {
  let today = new Date();
  today.setDate(today.getDate() - day);
  return today.toISOString();
};
const tickets: Ticket[] = [
  {
    id: 1,
    title: "Update footer copyright year",
    description: "Footer still shows 2025",
    priority: Priority.LOW,
    status: Status.OPEN,
    createdAt: get_created_day_before(3),
  },
  {
    id: 2,
    title: "Profile picture upload slow",
    description: "Upload takes 30+ seconds",
    priority: Priority.MEDIUM,
    status: Status.OPEN,
    createdAt: get_created_day_before(1),
  },
];

export function getAllTickets(): Ticket[] {
  return tickets;
}
