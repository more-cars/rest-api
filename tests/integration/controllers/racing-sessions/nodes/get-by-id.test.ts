import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RacingSession} from "../../../../../src/models/node-types/racing-sessions/RacingSession"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

test('Node does not exist', async () => {
    RacingSession.findById = vi.fn().mockImplementation(() => {
        throw new NodeNotFoundError(-42)
    })

    const response = await request(app)
        .get('/racing-sessions/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    RacingSession.findById = vi.fn().mockReturnValue({
        node_type: ModelNodeType.RacingSession,
        attributes: {
            id: 12345,
        },
    })

    const response = await request(app)
        .get('/racing-sessions/12345')

    expect(response.statusCode)
        .toBe(200)
})
