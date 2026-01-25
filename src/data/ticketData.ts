import { Ticket, Priority, Status } from "../api/v1/services/ticketService";

const get_created_day_before = (day: number) => {
  let today = new Date();
  today.setDate(today.getDate() - day);
  return today.toISOString();
};

export const ticketDataSample: Ticket[] = [
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
    createdAt: get_created_day_before(2),
  },
  {
    id: 3,
    title: "Dashboard loading slowly",
    description: "Dashboard takes 10+ seconds to load",
    priority: Priority.MEDIUM,
    status: Status.OPEN,
    createdAt: get_created_day_before(6),
  },
  {
    id: 4,
    title: "Password reset email delayed",
    description: "Reset emails taking over 30 minutes",
    priority: Priority.HIGH,
    status: Status.OPEN,
    createdAt: get_created_day_before(5),
  },
  {
    id: 5,
    title: "Export to PDF not working",
    description: "PDF export fails silently",
    priority: Priority.HIGH,
    status: Status.OPEN,
    createdAt: get_created_day_before(9),
  },
  {
    id: 6,
    title: "Login page not loading",
    description: "Users report blank screen on login",
    priority: Priority.CRITICAL,
    status: Status.OPEN,
    createdAt: get_created_day_before(6),
  },
  {
    id: 7,
    title: "Dark mode toggle broken",
    description: "Dark mode doesn't persist after refresh",
    priority: Priority.MEDIUM,
    status: Status.RESOLVED,
    createdAt: get_created_day_before(10),
  },
];
