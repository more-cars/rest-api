import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Video} from "../../../../../../src/models/node-types/videos/Video"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›is-main-video-of-node‹ relationships', () => {
    test('Providing valid data', async () => {
        Video.getAllIsMainVideoOfNodeRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.VideoIsMainVideoOfNode),
            getFakeRel(RelType.VideoIsMainVideoOfNode),
            getFakeRel(RelType.VideoIsMainVideoOfNode),
        ])

        const response = await request(app)
            .get('/videos/123/is-main-video-of-node')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        Video.getAllIsMainVideoOfNodeRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/videos/123/is-main-video-of-node')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Video, 'getAllIsMainVideoOfNodeRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/videos/123/is-main-video-of-node')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Video, 'getAllIsMainVideoOfNodeRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/videos/123/is-main-video-of-node')

        expect(response.statusCode)
            .toBe(404)
    })
})
