import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {MotorShow} from "../../../../../src/models/node-types/motor-shows/MotorShow"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

test('Expecting an error when the node does not exist', async () => {
    vi.spyOn(MotorShow, 'delete')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(-42)
        })

    const response = await request(app)
        .delete('/motor-shows/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Deleting the node when it actually exists', async () => {
    MotorShow.delete = vi.fn().mockReturnValue(true)

    const response = await request(app)
        .delete('/motor-shows/12345')

    expect(response.statusCode)
        .toBe(204)
})

test('Input is valid, but something breaks on the way', async () => {
    MotorShow.delete = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .delete('/motor-shows/987654321') // the actual ID is irrelevant here

    expect(response.statusCode)
        .toBe(500)
})
