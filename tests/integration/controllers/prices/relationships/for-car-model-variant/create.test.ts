import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Price} from "../../../../../../src/models/node-types/prices/Price"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"

describe('Creating a ›for-car-model-variant‹ relationship', () => {
    test('Providing valid data', async () => {
        Price.createForCarModelVariantRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.PriceForCarModelVariant))

        const response = await request(app)
            .post('/prices/123/for-car-model-variant/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Price, 'createForCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/prices/123/for-car-model-variant/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Price, 'createForCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/prices/123/for-car-model-variant/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(Price, 'createForCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('for-car-model-variant', 123, 567)
            })

        const response = await request(app)
            .post('/prices/123/for-car-model-variant/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
