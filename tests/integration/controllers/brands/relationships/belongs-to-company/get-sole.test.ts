import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Brand} from "../../../../../../src/models/brands/Brand"
import {Company} from "../../../../../../src/models/companies/Company"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting the ›belongs-to-company‹ relationship', () => {
    test('Providing valid data', async () => {
        Brand.getBelongsToCompanyRelationship = vi.fn().mockReturnValue({
            relationship_id: 4,
            relationship_name: 'belongs-to-company',
        })

        Company.findById = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .get('/brands/123/belongs-to-company')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(Brand, 'getBelongsToCompanyRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('belongs to company', 123)
            })

        const response = await request(app)
            .get('/brands/123/belongs-to-company')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Brand, 'getBelongsToCompanyRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/brands/123/belongs-to-company')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Brand, 'getBelongsToCompanyRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/brands/123/belongs-to-company')

        expect(response.statusCode)
            .toBe(404)
    })
})
