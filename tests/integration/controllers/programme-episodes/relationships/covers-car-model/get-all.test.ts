import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {ProgrammeEpisode} from "../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›covers-car-model‹ relationships', () => {
    test('Providing valid data', async () => {
        ProgrammeEpisode.getAllCoversCarModelRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.ProgrammeEpisodeCoversCarModel),
            getFakeRel(RelType.ProgrammeEpisodeCoversCarModel),
            getFakeRel(RelType.ProgrammeEpisodeCoversCarModel),
        ])

        const response = await request(app)
            .get('/programme-episodes/123/covers-car-model')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        ProgrammeEpisode.getAllCoversCarModelRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/programme-episodes/123/covers-car-model')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(ProgrammeEpisode, 'getAllCoversCarModelRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/programme-episodes/123/covers-car-model')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(ProgrammeEpisode, 'getAllCoversCarModelRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/programme-episodes/123/covers-car-model')

        expect(response.statusCode)
            .toBe(404)
    })
})
