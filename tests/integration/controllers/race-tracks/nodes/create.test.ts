import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RaceTrack} from "../../../../../src/models/race-tracks/RaceTrack"

test('Input data is valid', async () => {
    RaceTrack.create = vi.fn().mockReturnValue({
        id: 12345,
        name: "Lausitzring",
    })

    const response = await request(app)
        .post('/race-tracks')
        .send({
            name: "Lausitzring",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/race-tracks')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/race-tracks') // payload is missing

    expect(response.statusCode)
        .toBe(500)
})


