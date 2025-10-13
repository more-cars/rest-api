import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Company} from "../../../../../../src/models/companies/Company"
import {Image} from "../../../../../../src/models/images/Image"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-image‹ relationships', () => {
    test('Providing valid data', async () => {
        Company.getAllHasImageRelationships = vi.fn().mockReturnValue([
            {
                relationship_id: 4,
                relationship_name: 'has-image',
            }, {
                relationship_id: 5,
                relationship_name: 'has-image',
            }, {
                relationship_id: 6,
                relationship_name: 'has-image',
            }
        ])

        Image.findById = vi.fn().mockReturnValue(null)

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
