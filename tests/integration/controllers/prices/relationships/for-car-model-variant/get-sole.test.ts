import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Price} from "../../../../../../src/models/node-types/prices/Price"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting the ›for-car-model-variant‹ relationship', () => {
    test('Providing valid data', async () => {
        Price.getForCarModelVariantRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.PriceForCarModelVariant))

        const response = await request(app)
            .get('/prices/123/for-car-model-variant')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(Price, 'getForCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('for car model variant', 123)
            })

        const response = await request(app)
            .get('/prices/123/for-car-model-variant')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Price, 'getForCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/prices/123/for-car-model-variant')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Price, 'getForCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/prices/123/for-car-model-variant')

        expect(response.statusCode)
            .toBe(404)
    })
})
