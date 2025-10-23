import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RaceTrack} from "../../../../../../src/models/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›hosted-racing-event‹ relationship', () => {
    test('Providing valid data', async () => {
        RaceTrack.deleteHostedRacingEventRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/race-tracks/123/hosted-racing-event/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(RaceTrack, 'deleteHostedRacingEventRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/race-tracks/123/hosted-racing-event/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(RaceTrack, 'deleteHostedRacingEventRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('hosted-racing-event', 123, 567)
            })

        const response = await request(app)
            .delete('/race-tracks/123/hosted-racing-event/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RaceTrack, 'deleteHostedRacingEventRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/race-tracks/123/hosted-racing-event/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
