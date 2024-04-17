import request from "supertest";
import { app } from ".";

describe("GET /health", () => {
    it("should return a status of 200 and a success message", async () => {
        try {
            const response = await request(app).get("/health");
            expect(response.status).toBe(200);
            expect(response.body.status).toBe("success");
            expect(response.body.message).toBe("Health check passed");
            expect(response.body).toHaveProperty("uptime");
        } catch (err) {
            console.log(err);
        }
    });
});
