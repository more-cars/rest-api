import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {CarModelVariant} from "../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›featured-in-programme-episode‹ relationships', () => {
    test('Providing valid data', async () => {
        CarModelVariant.getAllFeaturedInProgrammeEpisodeRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.CarModelVariantFeaturedInProgrammeEpisode),
            getFakeRel(RelType.CarModelVariantFeaturedInProgrammeEpisode),
            getFakeRel(RelType.CarModelVariantFeaturedInProgrammeEpisode),
        ])

        const response = await request(app)
            .get('/car-model-variants/123/featured-in-programme-episode')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        CarModelVariant.getAllFeaturedInProgrammeEpisodeRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/car-model-variants/123/featured-in-programme-episode')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModelVariant, 'getAllFeaturedInProgrammeEpisodeRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/car-model-variants/123/featured-in-programme-episode')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModelVariant, 'getAllFeaturedInProgrammeEpisodeRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/car-model-variants/123/featured-in-programme-episode')

        expect(response.statusCode)
            .toBe(404)
    })
})
