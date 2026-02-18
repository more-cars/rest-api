import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RaceTrack} from "../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Creating a ›hosted-racing-event‹ relationship', () => {
    test('Providing valid data', async () => {
        RaceTrack.createHostedRacingEventRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelType.RaceTrackHostedRacingEvent,
        })

        const response = await request(app)
            .post('/race-tracks/123/hosted-racing-event/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RaceTrack, 'createHostedRacingEventRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/race-tracks/123/hosted-racing-event/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RaceTrack, 'createHostedRacingEventRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/race-tracks/123/hosted-racing-event/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(RaceTrack, 'createHostedRacingEventRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('hosted-racing-event', 123, 567)
            })

        const response = await request(app)
            .post('/race-tracks/123/hosted-racing-event/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
