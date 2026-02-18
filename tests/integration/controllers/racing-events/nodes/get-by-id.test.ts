import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RacingEvent} from "../../../../../src/models/node-types/racing-events/RacingEvent"

test('Node does not exist', async () => {
    RacingEvent.findById = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/racing-events/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    RacingEvent.findById = vi.fn().mockReturnValue({
        id: 12345
    })

    const response = await request(app)
        .get('/racing-events/12345')

    expect(response.statusCode)
        .toBe(200)
})
