import express, {Express} from "express"

const server: Express = express()
const PORT = 3000

server.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`)
})

// Health check
server.get('/health', async (req, res) => {
    res.sendStatus(200)
})