import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {LapTime} from "../../../../../src/models/node-types/lap-times/LapTime"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a LAP TIME by ID', () => {
    test('when it does not exist', async () => {
        LapTime.findById = vi.fn().mockImplementation(() => {
            throw new NodeNotFoundError(-42)
        })

        const response = await request(app)
            .get('/lap-times/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('when it does exist', async () => {
        LapTime.findById = vi.fn().mockReturnValue({
            node_type: ModelNodeType.LapTime,
            attributes: {
                id: 12345,
            },
        })

        const response = await request(app)
            .get('/lap-times/12345')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when the request is valid, but something breaks on the way', async () => {
        LapTime.findById = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/lap-times/12345')

        expect(response.statusCode)
            .toBe(500)
    })
})
