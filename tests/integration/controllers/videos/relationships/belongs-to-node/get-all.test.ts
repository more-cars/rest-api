import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Video} from "../../../../../../src/models/node-types/videos/Video"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›belongs-to-node‹ relationships', () => {
    test('Providing valid data', async () => {
        Video.getAllBelongsToNodeRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.VideoBelongsToNode),
            getFakeRel(RelType.VideoBelongsToNode),
            getFakeRel(RelType.VideoBelongsToNode),
        ])

        const response = await request(app)
            .get('/videos/123/belongs-to-node')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        Video.getAllBelongsToNodeRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/videos/123/belongs-to-node')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Video, 'getAllBelongsToNodeRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/videos/123/belongs-to-node')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Video, 'getAllBelongsToNodeRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/videos/123/belongs-to-node')

        expect(response.statusCode)
            .toBe(404)
    })
})
