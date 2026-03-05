import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›covered-by-magazine-issue‹ relationships', () => {
    test('Providing valid data', async () => {
        RacingEvent.getAllCoveredByMagazineIssueRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.RacingEventCoveredByMagazineIssue),
            getFakeRel(RelType.RacingEventCoveredByMagazineIssue),
            getFakeRel(RelType.RacingEventCoveredByMagazineIssue),
        ])

        const response = await request(app)
            .get('/racing-events/123/covered-by-magazine-issue')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        RacingEvent.getAllCoveredByMagazineIssueRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/racing-events/123/covered-by-magazine-issue')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingEvent, 'getAllCoveredByMagazineIssueRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/racing-events/123/covered-by-magazine-issue')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingEvent, 'getAllCoveredByMagazineIssueRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/racing-events/123/covered-by-magazine-issue')

        expect(response.statusCode)
            .toBe(404)
    })
})
