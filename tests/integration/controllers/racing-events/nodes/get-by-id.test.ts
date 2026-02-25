import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RacingEvent} from "../../../../../src/models/node-types/racing-events/RacingEvent"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a RACING EVENT by ID', () => {
    test('when it does not exist', async () => {
        RacingEvent.findById = vi.fn().mockImplementation(() => {
            throw new NodeNotFoundError(-42)
        })

        const response = await request(app)
            .get('/racing-events/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('when it does exist', async () => {
        RacingEvent.findById = vi.fn().mockReturnValue({
            node_type: ModelNodeType.RacingEvent,
            attributes: {
                id: 12345,
            },
        })

        const response = await request(app)
            .get('/racing-events/12345')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when the request is valid, but something breaks on the way', async () => {
        RacingEvent.findById = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/racing-events/12345')

        expect(response.statusCode)
            .toBe(500)
    })
})
