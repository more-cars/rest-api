import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Rating} from "../../../../../../src/models/node-types/ratings/Rating"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"

describe('Creating a ›by-magazine-issue‹ relationship', () => {
    test('Providing valid data', async () => {
        Rating.createByMagazineIssueRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.RatingByMagazineIssue))

        const response = await request(app)
            .post('/ratings/123/by-magazine-issue/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Rating, 'createByMagazineIssueRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/ratings/123/by-magazine-issue/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Rating, 'createByMagazineIssueRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/ratings/123/by-magazine-issue/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(Rating, 'createByMagazineIssueRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('by-magazine-issue', 123, 567)
            })

        const response = await request(app)
            .post('/ratings/123/by-magazine-issue/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
