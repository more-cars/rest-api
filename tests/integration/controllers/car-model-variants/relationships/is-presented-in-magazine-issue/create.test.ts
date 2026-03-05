import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {CarModelVariant} from "../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"

describe('Creating a ›is-presented-in-magazine-issue‹ relationship', () => {
    test('Providing valid data', async () => {
        CarModelVariant.createIsPresentedInMagazineIssueRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.CarModelVariantIsPresentedInMagazineIssue))

        const response = await request(app)
            .post('/car-model-variants/123/is-presented-in-magazine-issue/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModelVariant, 'createIsPresentedInMagazineIssueRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/car-model-variants/123/is-presented-in-magazine-issue/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModelVariant, 'createIsPresentedInMagazineIssueRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/car-model-variants/123/is-presented-in-magazine-issue/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(CarModelVariant, 'createIsPresentedInMagazineIssueRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('is-presented-in-magazine-issue', 123, 567)
            })

        const response = await request(app)
            .post('/car-model-variants/123/is-presented-in-magazine-issue/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
