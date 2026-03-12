import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {ProgrammeEpisode} from "../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›is-followed-by-episode‹ relationship', () => {
    test('Providing valid data', async () => {
        ProgrammeEpisode.deleteIsFollowedByEpisodeRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/programme-episodes/123/is-followed-by-episode/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(ProgrammeEpisode, 'deleteIsFollowedByEpisodeRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/programme-episodes/123/is-followed-by-episode/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(ProgrammeEpisode, 'deleteIsFollowedByEpisodeRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('is-followed-by-episode', 123, 567)
            })

        const response = await request(app)
            .delete('/programme-episodes/123/is-followed-by-episode/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(ProgrammeEpisode, 'deleteIsFollowedByEpisodeRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/programme-episodes/123/is-followed-by-episode/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
