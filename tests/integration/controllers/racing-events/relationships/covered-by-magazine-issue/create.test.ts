import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"

describe('Creating a ›covered-by-magazine-issue‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingEvent.createCoveredByMagazineIssueRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.RacingEventCoveredByMagazineIssue))

        const response = await request(app)
            .post('/racing-events/123/covered-by-magazine-issue/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingEvent, 'createCoveredByMagazineIssueRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/racing-events/123/covered-by-magazine-issue/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingEvent, 'createCoveredByMagazineIssueRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/racing-events/123/covered-by-magazine-issue/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(RacingEvent, 'createCoveredByMagazineIssueRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('covered-by-magazine-issue', 123, 567)
            })

        const response = await request(app)
            .post('/racing-events/123/covered-by-magazine-issue/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
