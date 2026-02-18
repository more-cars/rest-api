import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {SessionResult} from "../../../../../../src/models/session-results/SessionResult"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"

describe('Requesting all ›has-lap-time‹ relationships', () => {
    test('Providing valid data', async () => {
        SessionResult.getAllHasLapTimeRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelationshipType.SessionResultHasLapTime,
            }, {
                id: 5,
                type: RelationshipType.SessionResultHasLapTime,
            }, {
                id: 6,
                type: RelationshipType.SessionResultHasLapTime,
            }
        ])

        const response = await request(app)
            .get('/session-results/123/has-lap-time')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        SessionResult.getAllHasLapTimeRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/session-results/123/has-lap-time')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(SessionResult, 'getAllHasLapTimeRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/session-results/123/has-lap-time')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(SessionResult, 'getAllHasLapTimeRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/session-results/123/has-lap-time')

        expect(response.statusCode)
            .toBe(404)
    })
})
