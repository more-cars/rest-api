import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {MagazineIssue} from "../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"

describe('Creating a ›covers-racing-event‹ relationship', () => {
    test('Providing valid data', async () => {
        MagazineIssue.createCoversRacingEventRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.MagazineIssueCoversRacingEvent))

        const response = await request(app)
            .post('/magazine-issues/123/covers-racing-event/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(MagazineIssue, 'createCoversRacingEventRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/magazine-issues/123/covers-racing-event/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(MagazineIssue, 'createCoversRacingEventRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/magazine-issues/123/covers-racing-event/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(MagazineIssue, 'createCoversRacingEventRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('covers-racing-event', 123, 567)
            })

        const response = await request(app)
            .post('/magazine-issues/123/covers-racing-event/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
