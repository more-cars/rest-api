import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {LapTime} from "../../../../../src/models/lap-times/LapTime"

test('Input data is valid', async () => {
    LapTime.create = vi.fn().mockReturnValue({
        id: 12345,
        time: "PT1M33.294S",
        driver_name: "Klaus Ludwig",
    })

    const response = await request(app)
        .post('/lap-times')
        .send({
            time: "PT1M33.294S",
            driver_name: "Klaus Ludwig",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/lap-times')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/lap-times') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})


