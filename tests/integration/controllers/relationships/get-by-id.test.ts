import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../src/app'
import {Relationship} from "../../../../src/models/relationships/Relationship"
import {NodeNotFoundError} from "../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a relationship by ID', () => {
    test('Providing valid data', async () => {
        Relationship.findById = vi.fn().mockReturnValue({
            relationship_id: 4,
            relationship_name: 'rel',
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
                throw new RelationshipNotFoundError('rel', 7)
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
