import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {SessionResult} from "../../../../../src/models/node-types/session-results/SessionResult"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"

test('Node does not exist', async () => {
    SessionResult.findById = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/session-results/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    SessionResult.findById = vi.fn().mockReturnValue({
        node_type: ModelNodeType.SessionResult,
        attributes: {
            id: 12345,
        },
    })

    const response = await request(app)
        .get('/session-results/12345')

    expect(response.statusCode)
        .toBe(200)
})
