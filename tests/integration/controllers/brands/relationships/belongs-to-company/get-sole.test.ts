import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Brand} from "../../../../../../src/models/node-types/brands/Brand"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Requesting the ›belongs-to-company‹ relationship', () => {
    test('Providing valid data', async () => {
        Brand.getBelongsToCompanyRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelType.BrandBelongsToCompany,
        })

        const response = await request(app)
            .get('/brands/123/belongs-to-company')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(Brand, 'getBelongsToCompanyRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('belongs to company', 123)
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
