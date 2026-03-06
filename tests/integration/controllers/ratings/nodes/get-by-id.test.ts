import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Rating} from "../../../../../src/models/node-types/ratings/Rating"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a RATING by ID', () => {
    test('when it does not exist', async () => {
        Rating.findById = vi.fn().mockImplementation(() => {
            throw new NodeNotFoundError(-42)
        })

        const response = await request(app)
            .get('/ratings/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('when it does exist', async () => {
        Rating.findById = vi.fn().mockReturnValue({
            node_type: ModelNodeType.Rating,
            attributes: {
                id: 12345,
            },
        })

        const response = await request(app)
            .get('/ratings/12345')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when the request is valid, but something breaks on the way', async () => {
        Rating.findById = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/ratings/12345')

        expect(response.statusCode)
            .toBe(500)
    })
})
