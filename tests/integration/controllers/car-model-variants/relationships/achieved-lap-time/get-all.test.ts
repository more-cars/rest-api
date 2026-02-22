import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModelVariant} from "../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"

describe('Requesting all ›achieved-lap-time‹ relationships', () => {
    test('Providing valid data', async () => {
        CarModelVariant.getAllAchievedLapTimeRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.CarModelVariantAchievedLapTime),
            getFakeRel(RelType.CarModelVariantAchievedLapTime),
            getFakeRel(RelType.CarModelVariantAchievedLapTime),
        ])

        const response = await request(app)
            .get('/car-model-variants/123/achieved-lap-time')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        CarModelVariant.getAllAchievedLapTimeRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/car-model-variants/123/achieved-lap-time')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModelVariant, 'getAllAchievedLapTimeRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/car-model-variants/123/achieved-lap-time')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModelVariant, 'getAllAchievedLapTimeRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/car-model-variants/123/achieved-lap-time')

        expect(response.statusCode)
            .toBe(404)
    })
})
