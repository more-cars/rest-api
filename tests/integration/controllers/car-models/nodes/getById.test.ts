import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {CarModel} from "../../../../../src/models/car-models/CarModel"

test('Node does not exist', async () => {
    CarModel.findById = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/car-models/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    CarModel.findById = vi.fn().mockReturnValue({
        id: 12345,
        name: "dummy",
    })

    const response = await request(app)
        .get('/car-models/12345')

    expect(response.statusCode)
        .toBe(200)
})
