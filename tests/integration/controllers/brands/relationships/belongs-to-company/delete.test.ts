import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Brand} from "../../../../../../src/models/node-types/brands/Brand"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›belongs-to-company‹ relationship', () => {
    test('Providing valid data', async () => {
        Brand.deleteBelongsToCompanyRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/brands/123/belongs-to-company/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(Brand, 'deleteBelongsToCompanyRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/brands/123/belongs-to-company/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(Brand, 'deleteBelongsToCompanyRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('belongs-to-company', 123, 567)
            })

        const response = await request(app)
            .delete('/brands/123/belongs-to-company/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Brand, 'deleteBelongsToCompanyRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/brands/123/belongs-to-company/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
