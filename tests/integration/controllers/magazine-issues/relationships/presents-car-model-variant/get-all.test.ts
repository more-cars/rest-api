import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {MagazineIssue} from "../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›presents-car-model-variant‹ relationships', () => {
    test('Providing valid data', async () => {
        MagazineIssue.getAllPresentsCarModelVariantRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.MagazineIssuePresentsCarModelVariant),
            getFakeRel(RelType.MagazineIssuePresentsCarModelVariant),
            getFakeRel(RelType.MagazineIssuePresentsCarModelVariant),
        ])

        const response = await request(app)
            .get('/magazine-issues/123/presents-car-model-variant')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        MagazineIssue.getAllPresentsCarModelVariantRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/magazine-issues/123/presents-car-model-variant')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(MagazineIssue, 'getAllPresentsCarModelVariantRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/magazine-issues/123/presents-car-model-variant')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(MagazineIssue, 'getAllPresentsCarModelVariantRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/magazine-issues/123/presents-car-model-variant')

        expect(response.statusCode)
            .toBe(404)
    })
})
