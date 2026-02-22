import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Brand} from "../../../../../../src/models/node-types/brands/Brand"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"

describe('Requesting a specific ›has-car-model‹ relationship', () => {
    test('Providing valid data', async () => {
        Brand.getSpecificHasCarModelRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.BrandHasCarModel))

        const response = await request(app)
            .get('/brands/123/has-car-model/567')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing invalid data (nodes do not exist)', async () => {
        vi.spyOn(Brand, 'getSpecificHasCarModelRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/brands/123/has-car-model/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (relationship does not exist)', async () => {
        vi.spyOn(Brand, 'getSpecificHasCarModelRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('has-car-model', 123)
            })

        const response = await request(app)
            .get('/brands/123/has-car-model/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Brand, 'getSpecificHasCarModelRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/brands/123/has-car-model/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
