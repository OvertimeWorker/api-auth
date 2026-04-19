import { app } from "./app.js"

const PORT = process.env["PORT"] || 5000

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
