import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {ModelCar} from "../../../../../../src/models/node-types/model-cars/ModelCar"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-image‹ relationships', () => {
    test('Providing valid data', async () => {
        ModelCar.getAllHasImageRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.ModelCarHasImage),
            getFakeRel(RelType.ModelCarHasImage),
            getFakeRel(RelType.ModelCarHasImage),
        ])

        const response = await request(app)
            .get('/model-cars/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        ModelCar.getAllHasImageRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/model-cars/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(ModelCar, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/model-cars/123/has-image')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(ModelCar, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/model-cars/123/has-image')

        expect(response.statusCode)
            .toBe(404)
    })
})
