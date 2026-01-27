import { urgencyCalculation } from "../src/api/v1/services/ticketService";
import { Ticket, Priority, Status } from "../src/data/ticketData";

describe("01- Low Urgency", () => {
  it("should return low urgency for a low priority recent ticket", () => {
    // Arrange
    const ticket: Ticket = {
      id: 1,
      title: "low lol",
      description: "it is really low",
      priority: Priority.LOW,
      status: Status.OPEN,
      createdAt: new Date().toISOString(),
    };

    // Act
    const result = urgencyCalculation(ticket);

    // Assert
    // ticketAge = 0, baseScore = 10, urgencyScore = 0 * 5 + 10 = 10
    expect(result.urgencyScore).toBe(10);
    expect(result.urgencyLevel).toBe(
      "Low urgency. Address when capacity allows.",
    );
  });
});

describe("02- Moderate Urgency", () => {
  it("should return moderate urgency for a medium priority ticket", () => {
    // Arrange
    const twoDaysAgo: Date = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const ticket: Ticket = {
      id: 2,
      title: "it is ok!",
      description: "really ok",
      priority: Priority.MEDIUM,
      status: Status.OPEN,
      createdAt: twoDaysAgo.toISOString(),
    };

    // Act
    const result = urgencyCalculation(ticket);

    // Assert
    // ticketAge = 2, baseScore = 20, urgencyScore = 2 * 5 + 20 = 30
    expect(result.urgencyScore).toBe(30);
    expect(result.urgencyLevel).toBe("Moderate. Schedule for attention.");
  });
});

describe("03- Critical Urgency", () => {
  it("should return critical urgency for a critical priority old ticket", () => {
    // Arrange
    const sixDaysAgo: Date = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

    const ticket: Ticket = {
      id: 3,
      title: "do it right now",
      description: "911 help me",
      priority: Priority.CRITICAL,
      status: Status.OPEN,
      createdAt: sixDaysAgo.toISOString(),
    };

    // Act
    const result = urgencyCalculation(ticket);

    // Assert
    // ticketAge = 6, baseScore = 50, urgencyScore = 6 * 5 + 50 = 80
    expect(result.urgencyScore).toBe(80);
    expect(result.urgencyLevel).toBe("Critical. Immediate attention required.");
  });
});

describe("04- Resolved Ticket", () => {
  it("should return minimal urgency for a resolved ticket", () => {
    // Arrange
    const tenDaysAgo: Date = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    const ticket: Ticket = {
      id: 4,
      title: "just for achieve!!",
      description: "yeah",
      priority: Priority.CRITICAL,
      status: Status.RESOLVED,
      createdAt: tenDaysAgo.toISOString(),
    };

    // Act
    const result = urgencyCalculation(ticket);

    // Assert
    // resolved tickets always have urgencyScore = 0
    expect(result.urgencyScore).toBe(0);
    expect(result.urgencyLevel).toBe("Minimal. Ticket resolved.");
  });
});
