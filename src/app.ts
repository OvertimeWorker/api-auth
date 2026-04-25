import express, { type Express } from "express"
import morgan from "morgan"
import cors from "cors"
import compression from "compression"
import { initDiscoverPath } from "overtime-worker-api-utils/utils"

const app: Express = express()

app.disable("x-powered-by")
app.use(cors())
app.use(compression())
app.use(express.json())

if (process.env["NODE_ENV"] !== "test" && process.env["NODE_ENV"] !== "production") {
  app.use(morgan("dev"))
}

if (process.env["DISCOVER_PATH"] === "true") {
  initDiscoverPath(app)
}

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is running and healthy",
    data: null,
  })
})

export { app }
