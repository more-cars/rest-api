import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Image} from "../../../../../../src/models/images/Image"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a specific ›belongs-to-node‹ relationship', () => {
    test('Providing valid data', async () => {
        Image.getSpecificBelongsToNodeRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'belongs-to-node',
        })

        const response = await request(app)
            .get('/images/123/belongs-to-node/567')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing invalid data (nodes do not exist)', async () => {
        vi.spyOn(Image, 'getSpecificBelongsToNodeRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/images/123/belongs-to-node/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (relationship does not exist)', async () => {
        vi.spyOn(Image, 'getSpecificBelongsToNodeRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('belongs-to-node', 123)
            })

        const response = await request(app)
            .get('/images/123/belongs-to-node/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Image, 'getSpecificBelongsToNodeRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/images/123/belongs-to-node/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
