import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Image} from "../../../../../../src/models/images/Image"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›belongs-to-node‹ relationships', () => {
    test('Providing valid data', async () => {
        Image.getAllBelongsToNodeRelationships = vi.fn().mockReturnValue([
            {
                relationship_id: 4,
                relationship_name: 'belongs-to-node',
            }, {
                relationship_id: 5,
                relationship_name: 'belongs-to-node',
            }, {
                relationship_id: 6,
                relationship_name: 'belongs-to-node',
            }
        ])

        const response = await request(app)
            .get('/images/123/belongs-to-node')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        Image.getAllBelongsToNodeRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/images/123/belongs-to-node')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Image, 'getAllBelongsToNodeRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/images/123/belongs-to-node')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Image, 'getAllBelongsToNodeRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/images/123/belongs-to-node')

        expect(response.statusCode)
            .toBe(404)
    })
})
