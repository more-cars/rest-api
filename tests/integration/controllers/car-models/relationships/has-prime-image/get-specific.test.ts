import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModel} from "../../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"

describe('Requesting a specific ›has-prime-image‹ relationship', () => {
    test('Providing valid data', async () => {
        CarModel.getSpecificHasPrimeImageRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.CarModelHasPrimeImage))

        const response = await request(app)
            .get('/car-models/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing invalid data (nodes do not exist)', async () => {
        vi.spyOn(CarModel, 'getSpecificHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/car-models/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (relationship does not exist)', async () => {
        vi.spyOn(CarModel, 'getSpecificHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('has-prime-image', 123)
            })

        const response = await request(app)
            .get('/car-models/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModel, 'getSpecificHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/car-models/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
