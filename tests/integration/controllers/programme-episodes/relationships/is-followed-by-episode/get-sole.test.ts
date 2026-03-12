import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {ProgrammeEpisode} from "../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting the ›is-followed-by-episode‹ relationship', () => {
    test('Providing valid data', async () => {
        ProgrammeEpisode.getIsFollowedByEpisodeRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.ProgrammeEpisodeIsFollowedByEpisode))

        const response = await request(app)
            .get('/programme-episodes/123/is-followed-by-episode')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(ProgrammeEpisode, 'getIsFollowedByEpisodeRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('is followed by episode', 123)
            })

        const response = await request(app)
            .get('/programme-episodes/123/is-followed-by-episode')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(ProgrammeEpisode, 'getIsFollowedByEpisodeRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/programme-episodes/123/is-followed-by-episode')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(ProgrammeEpisode, 'getIsFollowedByEpisodeRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/programme-episodes/123/is-followed-by-episode')

        expect(response.statusCode)
            .toBe(404)
    })
})
