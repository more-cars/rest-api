import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Book} from "../../../../../../src/models/node-types/books/Book"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {ControllerNodeType} from "../../../../../../src/controllers/types/ControllerNodeType"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"

describe('Creating a ›covers-car-model-variant‹ relationship', () => {
    test('Providing valid data', async () => {
        Book.createCoversCarModelVariantRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.BookCoversCarModelVariant))

        const response = await request(app)
            .post('/books/123/relationships/covers-car-model-variant')
            .send({
                data: {
                    type: ControllerNodeType.CarModelVariant,
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Book, 'createCoversCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/books/123/relationships/covers-car-model-variant')
            .send({
                data: {
                    type: "covers-car-model-variant",
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Book, 'createCoversCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/books/123/relationships/covers-car-model-variant')
            .send({
                data: {
                    type: "covers-car-model-variant",
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(Book, 'createCoversCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('covers-car-model-variant', 123, 567)
            })

        const response = await request(app)
            .post('/books/123/relationships/covers-car-model-variant')
            .send({
                data: {
                    type: ControllerNodeType.CarModelVariant,
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(304)
    })
})
