import express from "express"
import {BookController} from "../../controllers/node-types/BookController"

const router = express.Router()

router.post('/books', BookController.create)

export default router
