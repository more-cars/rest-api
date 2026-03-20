import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {CarModelVariant} from "../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"

describe('Creating a ›has-price‹ relationship', () => {
    test('Providing valid data', async () => {
        CarModelVariant.createHasPriceRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.CarModelVariantHasPrice))

        const response = await request(app)
            .post('/car-model-variants/123/has-price/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModelVariant, 'createHasPriceRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/car-model-variants/123/has-price/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModelVariant, 'createHasPriceRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/car-model-variants/123/has-price/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(CarModelVariant, 'createHasPriceRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('has-price', 123, 567)
            })

        const response = await request(app)
            .post('/car-model-variants/123/has-price/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
