import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {LapTime} from "../../../../../../src/models/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"

describe('Creating a ›has-image‹ relationship', () => {
    test('Providing valid data', async () => {
        LapTime.createHasImageRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelationshipType.LapTimeHasImage,
        })

        const response = await request(app)
            .post('/lap-times/123/has-image/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(LapTime, 'createHasImageRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/lap-times/123/has-image/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(LapTime, 'createHasImageRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/lap-times/123/has-image/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(LapTime, 'createHasImageRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('has-image', 123, 567)
            })

        const response = await request(app)
            .post('/lap-times/123/has-image/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
