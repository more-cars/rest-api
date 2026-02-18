import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RaceTrack} from "../../../../../../src/models/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"

describe('Requesting all ›hosted-racing-event‹ relationships', () => {
    test('Providing valid data', async () => {
        RaceTrack.getAllHostedRacingEventRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelationshipType.RaceTrackHostedRacingEvent,
            }, {
                id: 5,
                type: RelationshipType.RaceTrackHostedRacingEvent,
            }, {
                id: 6,
                type: RelationshipType.RaceTrackHostedRacingEvent,
            }
        ])

        const response = await request(app)
            .get('/race-tracks/123/hosted-racing-event')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        RaceTrack.getAllHostedRacingEventRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/race-tracks/123/hosted-racing-event')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RaceTrack, 'getAllHostedRacingEventRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/race-tracks/123/hosted-racing-event')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RaceTrack, 'getAllHostedRacingEventRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/race-tracks/123/hosted-racing-event')

        expect(response.statusCode)
            .toBe(404)
    })
})
