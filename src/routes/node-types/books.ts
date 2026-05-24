import express from "express"
import {BookController} from "../../controllers/node-types/BookController"

const router = express.Router()

router.post('/books', BookController.create)
router.get('/books/:id', BookController.getById)
router.get('/books', BookController.getAll)

export default router
