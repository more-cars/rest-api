import express from "express"
import {BookController} from "../../controllers/node-types/BookController"

const router = express.Router()

router.post('/books', BookController.create)
router.get('/books/:id', BookController.getById)
router.get('/books', BookController.getAll)
router.patch('/books/:id', BookController.update)
router.delete('/books/:id', BookController.delete)
router.post('/books/:bookId/relationships/covers-car-model-variant', BookController.createCoversCarModelVariantRelation)
router.get('/books/:bookId/covers-car-model-variant', BookController.getAllCoversCarModelVariantRelations)
router.delete('/books/:bookId/relationships/covers-car-model-variant', BookController.deleteCoversCarModelVariantRelation)
router.post('/books/:bookId/relationships/has-image', BookController.createHasImageRelation)
router.get('/books/:bookId/has-image', BookController.getAllHasImageRelations)
router.delete('/books/:bookId/relationships/has-image', BookController.deleteHasImageRelation)
router.post('/books/:bookId/relationships/has-prime-image', BookController.createHasPrimeImageRelation)
router.get('/books/:bookId/has-prime-image', BookController.getHasPrimeImageRelation)
router.delete('/books/:bookId/relationships/has-prime-image', BookController.deleteHasPrimeImageRelation)
router.post('/books/:bookId/relationships/has-video', BookController.createHasVideoRelation)
router.get('/books/:bookId/has-video', BookController.getAllHasVideoRelations)
router.delete('/books/:bookId/relationships/has-video', BookController.deleteHasVideoRelation)
router.post('/books/:bookId/relationships/has-main-video', BookController.createHasMainVideoRelation)
router.get('/books/:bookId/has-main-video', BookController.getHasMainVideoRelation)
router.delete('/books/:bookId/relationships/has-main-video', BookController.deleteHasMainVideoRelation)

export default router
