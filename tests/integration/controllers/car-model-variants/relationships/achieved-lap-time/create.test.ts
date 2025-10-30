import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModelVariant} from "../../../../../../src/models/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"

describe('Creating a ›achieved-lap-time‹ relationship', () => {
    test('Providing valid data', async () => {
        CarModelVariant.createAchievedLapTimeRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'achieved-lap-time',
        })

        const response = await request(app)
            .post('/car-model-variants/123/achieved-lap-time/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModelVariant, 'createAchievedLapTimeRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/car-model-variants/123/achieved-lap-time/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModelVariant, 'createAchievedLapTimeRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/car-model-variants/123/achieved-lap-time/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(CarModelVariant, 'createAchievedLapTimeRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('achieved-lap-time', 123, 567)
            })

        const response = await request(app)
            .post('/car-model-variants/123/achieved-lap-time/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
