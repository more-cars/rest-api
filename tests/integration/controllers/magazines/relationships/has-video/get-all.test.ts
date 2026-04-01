import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Magazine} from "../../../../../../src/models/node-types/magazines/Magazine"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-video‹ relationships', () => {
    test('Providing valid data', async () => {
        Magazine.getAllHasVideoRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.MagazineHasVideo),
            getFakeRel(RelType.MagazineHasVideo),
            getFakeRel(RelType.MagazineHasVideo),
        ])

        const response = await request(app)
            .get('/magazines/123/has-video')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        Magazine.getAllHasVideoRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/magazines/123/has-video')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Magazine, 'getAllHasVideoRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/magazines/123/has-video')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Magazine, 'getAllHasVideoRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/magazines/123/has-video')

        expect(response.statusCode)
            .toBe(404)
    })
})
