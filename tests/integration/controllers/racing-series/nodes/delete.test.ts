import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RacingSeries} from "../../../../../src/models/node-types/racing-series/RacingSeries"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

test('Expecting an error when the node does not exist', async () => {
    vi.spyOn(RacingSeries, 'delete')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(-42)
        })

    const response = await request(app)
        .delete('/racing-series/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Deleting the node when it actually exists', async () => {
    RacingSeries.delete = vi.fn().mockReturnValue(true)

    const response = await request(app)
        .delete('/racing-series/12345')

    expect(response.statusCode)
        .toBe(204)
})

test('Input is valid, but something breaks on the way', async () => {
    RacingSeries.delete = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .delete('/racing-series/987654321') // the actual ID is irrelevant here

    expect(response.statusCode)
        .toBe(500)
})
