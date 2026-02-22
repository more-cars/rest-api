import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModel} from "../../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"

describe('Requesting the ›belongs-to-brand‹ relationship', () => {
    test('Providing valid data', async () => {
        CarModel.getBelongsToBrandRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.CarModelBelongsToBrand))

        const response = await request(app)
            .get('/car-models/123/belongs-to-brand')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(CarModel, 'getBelongsToBrandRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('belongs-to-brand', 123)
            })

        const response = await request(app)
            .get('/car-models/123/belongs-to-brand')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModel, 'getBelongsToBrandRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/car-models/123/belongs-to-brand')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModel, 'getBelongsToBrandRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/car-models/123/belongs-to-brand')

        expect(response.statusCode)
            .toBe(404)
    })
})
