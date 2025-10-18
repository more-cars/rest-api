import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Brand} from "../../../../../../src/models/brands/Brand"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"

describe('Creating a ›belongs-to-company‹ relationship', () => {
    test('Providing valid data', async () => {
        Brand.createBelongsToCompanyRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'belongs-to-company',
        })

        const response = await request(app)
            .post('/brands/123/belongs-to-company/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Brand, 'createBelongsToCompanyRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/brands/123/belongs-to-company/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Brand, 'createBelongsToCompanyRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/brands/123/belongs-to-company/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(Brand, 'createBelongsToCompanyRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('belongs-to-company', 123, 567)
            })

        const response = await request(app)
            .post('/brands/123/belongs-to-company/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
