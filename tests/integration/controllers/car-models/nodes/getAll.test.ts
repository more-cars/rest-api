import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {CarModel} from "../../../../../src/models/car-models/CarModel"

test('No nodes exist', async () => {
    CarModel.findAll = vi.fn().mockReturnValue([])

    const response = await request(app)
        .get('/car-models')

    expect(response.statusCode)
        .toBe(200)
})

test('Multiple nodes exist', async () => {
    CarModel.findAll = vi.fn().mockReturnValue([
        {
            id: 1,
            name: "dummy",
        }, {
            id: 2,
            name: "dummy",
        }, {
            id: 3,
            name: "dummy",
        }
    ])

    const response = await request(app)
        .get('/car-models')

    expect(response.statusCode)
        .toBe(200)
})
