import { api } from "~/utils/jest.utils.js"

describe("Health Check Endpoint", () => {
  describe("GET /health", () => {
    it("returns 200 OK when the service is operational", async () => {
      const res = await api.get("/health")
      expect(res.statusCode).toBe(200)
    })
  })
})
