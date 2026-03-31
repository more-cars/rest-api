import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {ModelCarBrand} from "../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting the ›has-main-video‹ relationship', () => {
    test('Providing valid data', async () => {
        ModelCarBrand.getHasMainVideoRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.ModelCarBrandHasMainVideo))

        const response = await request(app)
            .get('/model-car-brands/123/has-main-video')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(ModelCarBrand, 'getHasMainVideoRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('has main video', 123)
            })

        const response = await request(app)
            .get('/model-car-brands/123/has-main-video')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(ModelCarBrand, 'getHasMainVideoRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/model-car-brands/123/has-main-video')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(ModelCarBrand, 'getHasMainVideoRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/model-car-brands/123/has-main-video')

        expect(response.statusCode)
            .toBe(404)
    })
})
