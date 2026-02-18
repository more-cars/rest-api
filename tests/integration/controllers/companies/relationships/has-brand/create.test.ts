import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Company} from "../../../../../../src/models/companies/Company"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"

describe('Creating a ›has-brand‹ relationship', () => {
    test('Providing valid data', async () => {
        Company.createHasBrandRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelationshipType.CompanyHasBrand,
        })

        const response = await request(app)
            .post('/companies/123/has-brand/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Company, 'createHasBrandRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/companies/123/has-brand/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Company, 'createHasBrandRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/companies/123/has-brand/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(Company, 'createHasBrandRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('has-brand', 123, 567)
            })

        const response = await request(app)
            .post('/companies/123/has-brand/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
