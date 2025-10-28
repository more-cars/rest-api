import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {LapTime} from "../../../../../src/models/lap-times/LapTime"

test('Node does not exist', async () => {
    LapTime.findById = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/lap-times/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    LapTime.findById = vi.fn().mockReturnValue({
        id: 12345
    })

    const response = await request(app)
        .get('/lap-times/12345')

    expect(response.statusCode)
        .toBe(200)
})
