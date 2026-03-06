import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModelVariant} from "../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›reviewed-by-magazine-issue-with-rating‹ relationship', () => {
    test('Providing valid data', async () => {
        CarModelVariant.deleteReviewedByMagazineIssueWithRatingRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/car-model-variants/123/reviewed-by-magazine-issue-with-rating/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(CarModelVariant, 'deleteReviewedByMagazineIssueWithRatingRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/car-model-variants/123/reviewed-by-magazine-issue-with-rating/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(CarModelVariant, 'deleteReviewedByMagazineIssueWithRatingRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('reviewed-by-magazine-issue-with-rating', 123, 567)
            })

        const response = await request(app)
            .delete('/car-model-variants/123/reviewed-by-magazine-issue-with-rating/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModelVariant, 'deleteReviewedByMagazineIssueWithRatingRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/car-model-variants/123/reviewed-by-magazine-issue-with-rating/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
