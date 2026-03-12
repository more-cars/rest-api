import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Programme} from "../../../../../../src/models/node-types/programmes/Programme"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-episode‹ relationships', () => {
    test('Providing valid data', async () => {
        Programme.getAllHasEpisodeRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.ProgrammeHasEpisode),
            getFakeRel(RelType.ProgrammeHasEpisode),
            getFakeRel(RelType.ProgrammeHasEpisode),
        ])

        const response = await request(app)
            .get('/programmes/123/has-episode')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        Programme.getAllHasEpisodeRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/programmes/123/has-episode')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Programme, 'getAllHasEpisodeRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/programmes/123/has-episode')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Programme, 'getAllHasEpisodeRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/programmes/123/has-episode')

        expect(response.statusCode)
            .toBe(404)
    })
})
