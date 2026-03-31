import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {ModelCarBrand} from "../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-video‹ relationships', () => {
    test('Providing valid data', async () => {
        ModelCarBrand.getAllHasVideoRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.ModelCarBrandHasVideo),
            getFakeRel(RelType.ModelCarBrandHasVideo),
            getFakeRel(RelType.ModelCarBrandHasVideo),
        ])

        const response = await request(app)
            .get('/model-car-brands/123/has-video')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        ModelCarBrand.getAllHasVideoRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/model-car-brands/123/has-video')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(ModelCarBrand, 'getAllHasVideoRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/model-car-brands/123/has-video')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(ModelCarBrand, 'getAllHasVideoRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/model-car-brands/123/has-video')

        expect(response.statusCode)
            .toBe(404)
    })
})
