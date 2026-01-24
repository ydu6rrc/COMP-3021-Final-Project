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
}

// Interface for the ticket
export interface Ticket {
  id: number;
  title: number;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}

//  Ticket interface for the result
export interface TicketResult {
  id: number;
  title: number;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: string;
  ticketAge: number;
  urgencyScore: number;
  urgencyLevel: string;
}
