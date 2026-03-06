import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Rating} from "../../../../../../src/models/node-types/ratings/Rating"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-image‹ relationships', () => {
    test('Providing valid data', async () => {
        Rating.getAllHasImageRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.RatingHasImage),
            getFakeRel(RelType.RatingHasImage),
            getFakeRel(RelType.RatingHasImage),
        ])

        const response = await request(app)
            .get('/ratings/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        Rating.getAllHasImageRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/ratings/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Rating, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/ratings/123/has-image')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Rating, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/ratings/123/has-image')

        expect(response.statusCode)
            .toBe(404)
    })
})
