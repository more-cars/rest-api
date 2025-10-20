import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RaceTrack} from "../../../../../src/models/race-tracks/RaceTrack"

test('Node does not exist', async () => {
    RaceTrack.findById = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/race-tracks/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    RaceTrack.findById = vi.fn().mockReturnValue({
        id: 12345
    })

    const response = await request(app)
        .get('/race-tracks/12345')

    expect(response.statusCode)
        .toBe(200)
})
