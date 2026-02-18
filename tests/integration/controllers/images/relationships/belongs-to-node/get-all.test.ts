import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Image} from "../../../../../../src/models/images/Image"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"

describe('Requesting all ›belongs-to-node‹ relationships', () => {
    test('Providing valid data', async () => {
        Image.getAllBelongsToNodeRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelationshipType.ImageBelongsToNode,
            }, {
                id: 5,
                type: RelationshipType.ImageBelongsToNode,
            }, {
                id: 6,
                type: RelationshipType.ImageBelongsToNode,
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
