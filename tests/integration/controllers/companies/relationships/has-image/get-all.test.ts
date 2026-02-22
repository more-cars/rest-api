import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Company} from "../../../../../../src/models/node-types/companies/Company"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"

describe('Requesting all ›has-image‹ relationships', () => {
    test('Providing valid data', async () => {
        Company.getAllHasImageRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.CompanyHasImage),
            getFakeRel(RelType.CompanyHasImage),
            getFakeRel(RelType.CompanyHasImage),
        ])

        const response = await request(app)
            .get('/companies/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        Company.getAllHasImageRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/companies/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Company, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/companies/123/has-image')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Company, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/companies/123/has-image')

        expect(response.statusCode)
            .toBe(404)
    })
})
