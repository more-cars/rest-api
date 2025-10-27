import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RacingSession} from "../../../../../src/models/racing-sessions/RacingSession"

test('Node does not exist', async () => {
    RacingSession.findById = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/racing-sessions/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    RacingSession.findById = vi.fn().mockReturnValue({
        id: 12345
    })

    const response = await request(app)
        .get('/racing-sessions/12345')

    expect(response.statusCode)
        .toBe(200)
})
