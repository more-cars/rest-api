import express from "express"
import {BookController} from "../../controllers/node-types/BookController"

const router = express.Router()

router.post('/books', BookController.create)
router.get('/books/:id', BookController.getById)
router.get('/books', BookController.getAll)
router.patch('/books/:id', BookController.update)
router.delete('/books/:id', BookController.delete)
router.post('/books/:bookId/covers-car-model-variant/:carModelVariantId', BookController.createCoversCarModelVariantRelation)
router.get('/books/:bookId/covers-car-model-variant', BookController.getAllCoversCarModelVariantRelations)
router.delete('/books/:bookId/covers-car-model-variant/:carModelVariantId', BookController.deleteCoversCarModelVariantRelation)
router.post('/books/:bookId/has-image/:imageId', BookController.createHasImageRelation)
router.get('/books/:bookId/has-image', BookController.getAllHasImageRelations)
router.delete('/books/:bookId/has-image/:imageId', BookController.deleteHasImageRelation)
router.post('/books/:bookId/has-prime-image/:imageId', BookController.createHasPrimeImageRelation)
router.get('/books/:bookId/has-prime-image', BookController.getHasPrimeImageRelation)
router.delete('/books/:bookId/has-prime-image/:imageId', BookController.deleteHasPrimeImageRelation)
router.post('/books/:bookId/has-video/:videoId', BookController.createHasVideoRelation)
router.get('/books/:bookId/has-video', BookController.getAllHasVideoRelations)
router.delete('/books/:bookId/has-video/:videoId', BookController.deleteHasVideoRelation)
router.post('/books/:bookId/has-main-video/:videoId', BookController.createHasMainVideoRelation)
router.get('/books/:bookId/has-main-video', BookController.getHasMainVideoRelation)
router.delete('/books/:bookId/has-main-video/:videoId', BookController.deleteHasMainVideoRelation)

export default router
