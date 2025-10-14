import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"

describe('Creating a ›has-successor‹ relationship', () => {
    test('Providing valid data', async () => {
        CarModel.createHasSuccessorRelationship = vi.fn().mockReturnValue({
            relationship_id: 4,
            relationship_name: 'has-successor',
        })

        const response = await request(app)
            .post('/car-models/123/has-successor/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModel, 'createHasSuccessorRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/car-models/123/has-successor/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModel, 'createHasSuccessorRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/car-models/123/has-successor/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(CarModel, 'createHasSuccessorRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('has-successor', 123, 567)
            })

        const response = await request(app)
            .post('/car-models/123/has-successor/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
