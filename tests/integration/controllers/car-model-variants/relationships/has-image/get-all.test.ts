import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModelVariant} from "../../../../../../src/models/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Requesting all ›has-image‹ relationships', () => {
    test('Providing valid data', async () => {
        CarModelVariant.getAllHasImageRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelType.CarModelVariantHasImage,
            }, {
                id: 5,
                type: RelType.CarModelVariantHasImage,
            }, {
                id: 6,
                type: RelType.CarModelVariantHasImage,
            }
        ])

        const response = await request(app)
            .get('/car-model-variants/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        CarModelVariant.getAllHasImageRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/car-model-variants/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModelVariant, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/car-model-variants/123/has-image')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModelVariant, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/car-model-variants/123/has-image')

        expect(response.statusCode)
            .toBe(404)
    })
})
