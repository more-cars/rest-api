import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {ModelCarBrand} from "../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"

describe('Creating a ›created-model-car‹ relationship', () => {
    test('Providing valid data', async () => {
        ModelCarBrand.createCreatedModelCarRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.ModelCarBrandCreatedModelCar))

        const response = await request(app)
            .post('/model-car-brands/123/created-model-car/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(ModelCarBrand, 'createCreatedModelCarRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/model-car-brands/123/created-model-car/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(ModelCarBrand, 'createCreatedModelCarRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/model-car-brands/123/created-model-car/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(ModelCarBrand, 'createCreatedModelCarRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('created-model-car', 123, 567)
            })

        const response = await request(app)
            .post('/model-car-brands/123/created-model-car/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
