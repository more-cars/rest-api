import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {MagazineIssue} from "../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›covers-car-model‹ relationships', () => {
    test('Providing valid data', async () => {
        MagazineIssue.getAllCoversCarModelRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.MagazineIssueCoversCarModel),
            getFakeRel(RelType.MagazineIssueCoversCarModel),
            getFakeRel(RelType.MagazineIssueCoversCarModel),
        ])

        const response = await request(app)
            .get('/magazine-issues/123/covers-car-model')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        MagazineIssue.getAllCoversCarModelRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/magazine-issues/123/covers-car-model')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(MagazineIssue, 'getAllCoversCarModelRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/magazine-issues/123/covers-car-model')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(MagazineIssue, 'getAllCoversCarModelRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/magazine-issues/123/covers-car-model')

        expect(response.statusCode)
            .toBe(404)
    })
})
