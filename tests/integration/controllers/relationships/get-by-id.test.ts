import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../src/app'
import {Relationship} from "../../../../src/models/Relationship"
import {RelType} from "../../../../src/models/relationships/types/RelType"
import {NodeNotFoundError} from "../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../src/models/types/RelNotFoundError"

describe('Requesting a relationship by ID', () => {
    test('Providing valid data', async () => {
        Relationship.findById = vi.fn().mockReturnValue({
            id: 4,
            type: RelType.BrandBelongsToCompany,
        })

        const response = await request(app)
            .get('/relationships/123')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Valid relationship ID, but partner node could not be loaded', async () => {
        vi.spyOn(Relationship, 'findById')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(7)
            })

        const response = await request(app)
            .get('/relationships/123')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Relationship does not exist', async () => {
        vi.spyOn(Relationship, 'findById')
            .mockImplementation(async () => {
                throw new RelNotFoundError('rel', 7)
            })

        const response = await request(app)
            .get('/relationships/123')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Relationship, 'findById')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/relationships/123')

        expect(response.statusCode)
            .toBe(500)
    })
})
