import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {RaceTrack} from "../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {FakeRaceTrack} from "../../../../../_toolbox/fixtures/nodes/FakeRaceTrack"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        RaceTrack.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/race-tracks')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        RaceTrack.findAll = vi.fn().mockReturnValue([
            FakeRaceTrack.modelOutput,
            FakeRaceTrack.modelOutput,
            FakeRaceTrack.modelOutput,
        ])

        const response = await request(app)
            .get('/race-tracks')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        RaceTrack.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/race-tracks')

        expect(response.statusCode)
            .toBe(500)
    })
})
