import request from "supertest";
import { app } from "../app";
import { DatasourceManager } from "../config/DatasourceManager.service";

const { dataSource } = DatasourceManager.getInstance();

describe("GET /health", () => {
    it("should return a status of 200 and a success message", async () => {
        const response = await request(app).get("/health");
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("Health check passed");
        expect(response.body).toHaveProperty("uptime");
    }, 30000);
});

describe("GET /auth/google", () => {
    it("should redirect to Google OAuth", async () => {
        const response = await request(app).get("/auth/google");
        expect(response.status).toBe(302);
        expect(response.headers.location).toContain("accounts.google.com");
    }, 30000);
});

describe("GET /auth/google/callback", () => {
    it("should handle authentication successfully", async () => {
        const response = await request(app).get("/auth/google/callback");
        expect(response.status).toBe(302);
    }, 30000);
});

afterAll(async () => {
    await dataSource.close();
});
