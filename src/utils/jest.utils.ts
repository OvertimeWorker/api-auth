import request from "supertest"
import { app } from "~/app.js"

const api = request(app)

export { api }
