import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {LapTime} from "../../../../../../src/models/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"

describe('Requesting all ›has-image‹ relationships', () => {
    test('Providing valid data', async () => {
        LapTime.getAllHasImageRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelationshipType.LapTimeHasImage,
            }, {
                id: 5,
                type: RelationshipType.LapTimeHasImage,
            }, {
                id: 6,
                type: RelationshipType.LapTimeHasImage,
            }
        ])

        const response = await request(app)
            .get('/lap-times/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        LapTime.getAllHasImageRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/lap-times/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(LapTime, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/lap-times/123/has-image')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(LapTime, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/lap-times/123/has-image')

        expect(response.statusCode)
            .toBe(404)
    })
})
