import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {CarModel} from "../../../../../src/models/car-models/CarModel"

test('Expecting error when node does not exist', async () => {
    CarModel.delete = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .delete('/car-models/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Deleting node when it actually exists', async () => {
    CarModel.delete = vi.fn().mockReturnValue(true)

    const response = await request(app)
        .delete('/car-models/12345')

    expect(response.statusCode)
        .toBe(204)
})
