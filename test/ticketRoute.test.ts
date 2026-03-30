import request, { type Response } from "supertest";
import app from "../src/app";

describe("01-create ticket success", () => {
	it("create a new ticket", async () => {
		// Arrange
		const newTicket = {
			title: "my new ticket",
			description: "this is a test ticket",
			priority: "high",
		};

		// Act
		const response: Response = await request(app)
			.post("/api/v1/tickets/")
			.send(newTicket);

		// Assert
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body.title).toBe("my new ticket");
	});
});

describe("02- POST missing title", () => {
	it("return 400 ", async () => {
		// Arrange
		const badTicket = {
			description: "forgot the title",
			priority: "medium",
		};

		// Act
		const response: Response = await request(app)
			.post("/api/v1/tickets/")
			.send(badTicket);

		// Assert
		expect(response.status).toBe(400);
		expect(response.body.message).toBe("Missing required field: title");
	});
});

describe("03- GET all tickets", () => {
	it("all tickets", async () => {
		// Arrange
		// nothing to arrange here

		// Act
		const response: Response = await request(app).get("/api/v1/tickets");

		// Assert
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("data");
		expect(Array.isArray(response.body.data)).toBe(true);
	});
});

describe("04- GET ticket urgency success", () => {
	it("should return ticket with urgency info", async () => {
		// Arrange
		const ticketId: number = 1;

		// Act
		const response: Response = await request(app).get(
			`/api/v1/tickets/${ticketId}/urgency`,
		);

		// Assert
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("urgencyScore");
		expect(response.body).toHaveProperty("urgencyLevel");
	});
});

describe("05- GET ticket not found", () => {
	it("404", async () => {
		// Arrange
		const fakeId: number = 99999;

		// Act
		const response: Response = await request(app).get(
			`/api/v1/tickets/${fakeId}/urgency`,
		);

		// Assert
		expect(response.status).toBe(404);
		expect(response.body.message).toBe("Ticket not found.");
	});
});

describe("06- PUT update ticket success", () => {
	it("should update ticket status", async () => {
		// Arrange
		const ticketId: number = 1;
		const updateData = {
			status: "in-progress",
		};

		// Act
		const response: Response = await request(app)
			.put(`/api/v1/tickets/${ticketId}`)
			.send(updateData);

		// Assert
		expect(response.status).toBe(200);
		expect(response.body.status).toBe("in-progress");
	});
});

describe("07- PUT update ticket bad priority", () => {
	it("400", async () => {
		// Arrange
		const ticketId: number = 1;
		const badUpdate = {
			priority: "hi",
		};

		// Act
		const response: Response = await request(app)
			.put(`/api/v1/tickets/${ticketId}`)
			.send(badUpdate);

		// Assert
		expect(response.status).toBe(400);
		expect(response.body.message).toBe(
			"Invalid priority. Must be one of: critical, high, medium, low",
		);
	});
});

describe("08- DELETE ticket", () => {
	it("delete success", async () => {
		// Arrange
		const ticketId: number = 3;

		// Act
		const response: Response = await request(app).delete(
			`/api/v1/tickets/${ticketId}`,
		);

		// Assert
		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Delete success");
	});
});
