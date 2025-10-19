import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Company} from "../../../../../../src/models/companies/Company"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-brand‹ relationships', () => {
    test('Providing valid data', async () => {
        Company.getAllHasBrandRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: 'has-brand',
            }, {
                id: 5,
                type: 'has-brand',
            }, {
                id: 6,
                type: 'has-brand',
            }
        ])

        const response = await request(app)
            .get('/companies/123/has-brand')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        Company.getAllHasBrandRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/companies/123/has-brand')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Company, 'getAllHasBrandRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/companies/123/has-brand')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Company, 'getAllHasBrandRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/companies/123/has-brand')

        expect(response.statusCode)
            .toBe(404)
    })
})
