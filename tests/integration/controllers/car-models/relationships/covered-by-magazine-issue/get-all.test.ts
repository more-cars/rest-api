import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {CarModel} from "../../../../../../src/models/node-types/car-models/CarModel"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›covered-by-magazine-issue‹ relationships', () => {
    test('Providing valid data', async () => {
        CarModel.getAllCoveredByMagazineIssueRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.CarModelCoveredByMagazineIssue),
            getFakeRel(RelType.CarModelCoveredByMagazineIssue),
            getFakeRel(RelType.CarModelCoveredByMagazineIssue),
        ])

        const response = await request(app)
            .get('/car-models/123/covered-by-magazine-issue')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        CarModel.getAllCoveredByMagazineIssueRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/car-models/123/covered-by-magazine-issue')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModel, 'getAllCoveredByMagazineIssueRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/car-models/123/covered-by-magazine-issue')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModel, 'getAllCoveredByMagazineIssueRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/car-models/123/covered-by-magazine-issue')

        expect(response.statusCode)
            .toBe(404)
    })
})
