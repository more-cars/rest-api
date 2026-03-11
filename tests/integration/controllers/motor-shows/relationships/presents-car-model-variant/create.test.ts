import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {MotorShow} from "../../../../../../src/models/node-types/motor-shows/MotorShow"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"

describe('Creating a ›presents-car-model-variant‹ relationship', () => {
    test('Providing valid data', async () => {
        MotorShow.createPresentsCarModelVariantRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.MotorShowPresentsCarModelVariant))

        const response = await request(app)
            .post('/motor-shows/123/presents-car-model-variant/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(MotorShow, 'createPresentsCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/motor-shows/123/presents-car-model-variant/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(MotorShow, 'createPresentsCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/motor-shows/123/presents-car-model-variant/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(MotorShow, 'createPresentsCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('presents-car-model-variant', 123, 567)
            })

        const response = await request(app)
            .post('/motor-shows/123/presents-car-model-variant/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
