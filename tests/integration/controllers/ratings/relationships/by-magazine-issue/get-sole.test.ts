import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Rating} from "../../../../../../src/models/node-types/ratings/Rating"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting the ›by-magazine-issue‹ relationship', () => {
    test('Providing valid data', async () => {
        Rating.getByMagazineIssueRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.RatingByMagazineIssue))

        const response = await request(app)
            .get('/ratings/123/by-magazine-issue')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(Rating, 'getByMagazineIssueRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('by magazine issue', 123)
            })

        const response = await request(app)
            .get('/ratings/123/by-magazine-issue')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Rating, 'getByMagazineIssueRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/ratings/123/by-magazine-issue')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Rating, 'getByMagazineIssueRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/ratings/123/by-magazine-issue')

        expect(response.statusCode)
            .toBe(404)
    })
})
