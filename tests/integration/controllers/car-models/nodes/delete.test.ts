import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {CarModel} from "../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

test('Expecting error when node does not exist', async () => {
    vi.spyOn(CarModel, 'delete')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(-42)
        })

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

test('Input is valid, but something breaks on the way', async () => {
    CarModel.delete = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .delete('/car-models/987654321') // the actual ID is irrelevant here

    expect(response.statusCode)
        .toBe(500)
})
