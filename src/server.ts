import "dotenv/config"
import express from "express"
import morgan from "morgan"
import cors from "cors"
import compression from "compression"

const app = express()
const PORT = process.env["PORT"] || 5000

app.disable("x-powered-by")
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(morgan("dev"))

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is running and healthy",
    data: null,
  })
})

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
})

server.on("error", (err: Error & { code?: string }) => {
  if (err.code === "EADDRINUSE") {
    // eslint-disable-next-line no-console
    console.error(`🚨 Port ${PORT} is already in use`)
    process.exit(1)
  }
})
