import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RaceTrack} from "../../../../../src/models/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

test('Expecting an error when the node does not exist', async () => {
    vi.spyOn(RaceTrack, 'delete')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(-42)
        })

    const response = await request(app)
        .delete('/race-tracks/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Deleting the node when it actually exists', async () => {
    RaceTrack.delete = vi.fn().mockReturnValue(true)

    const response = await request(app)
        .delete('/race-tracks/12345')

    expect(response.statusCode)
        .toBe(204)
})
