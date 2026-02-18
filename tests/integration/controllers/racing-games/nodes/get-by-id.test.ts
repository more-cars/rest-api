import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RacingGame} from "../../../../../src/models/node-types/racing-games/RacingGame"

test('Node does not exist', async () => {
    RacingGame.findById = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/racing-games/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    RacingGame.findById = vi.fn().mockReturnValue({
        id: 12345
    })

    const response = await request(app)
        .get('/racing-games/12345')

    expect(response.statusCode)
        .toBe(200)
})
