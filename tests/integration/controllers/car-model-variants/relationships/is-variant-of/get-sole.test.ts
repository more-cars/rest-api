import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModelVariant} from "../../../../../../src/models/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting the ›is-variant-of‹ relationship', () => {
    test('Providing valid data', async () => {
        CarModelVariant.getIsVariantOfRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'is-variant-of',
        })

        const response = await request(app)
            .get('/car-model-variants/123/is-variant-of')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(CarModelVariant, 'getIsVariantOfRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('is variant of', 123)
            })

        const response = await request(app)
            .get('/car-model-variants/123/is-variant-of')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModelVariant, 'getIsVariantOfRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/car-model-variants/123/is-variant-of')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModelVariant, 'getIsVariantOfRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/car-model-variants/123/is-variant-of')

        expect(response.statusCode)
            .toBe(404)
    })
})
