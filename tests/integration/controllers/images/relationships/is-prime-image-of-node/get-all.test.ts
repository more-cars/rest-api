import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Image} from "../../../../../../src/models/images/Image"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"

describe('Requesting all ›is-prime-image-of-node‹ relationships', () => {
    test('Providing valid data', async () => {
        Image.getAllIsPrimeImageOfNodeRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelationshipType.ImageIsPrimeImageOfNode,
            }, {
                id: 5,
                type: RelationshipType.ImageIsPrimeImageOfNode,
            }, {
                id: 6,
                type: RelationshipType.ImageIsPrimeImageOfNode,
            }
        ])

        const response = await request(app)
            .get('/images/123/is-prime-image-of-node')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        Image.getAllIsPrimeImageOfNodeRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/images/123/is-prime-image-of-node')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Image, 'getAllIsPrimeImageOfNodeRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/images/123/is-prime-image-of-node')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Image, 'getAllIsPrimeImageOfNodeRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/images/123/is-prime-image-of-node')

        expect(response.statusCode)
            .toBe(404)
    })
})
