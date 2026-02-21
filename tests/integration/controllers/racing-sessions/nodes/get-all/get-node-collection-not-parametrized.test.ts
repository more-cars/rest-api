import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {RacingSession} from "../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {FakeRacingSession} from "../../../../../_toolbox/fixtures/nodes/FakeRacingSession"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        RacingSession.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/racing-sessions')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        RacingSession.findAll = vi.fn().mockReturnValue([
            FakeRacingSession.modelOutput(),
            FakeRacingSession.modelOutput(),
            FakeRacingSession.modelOutput(),
        ])

        const response = await request(app)
            .get('/racing-sessions')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        RacingSession.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/racing-sessions')

        expect(response.statusCode)
            .toBe(500)
    })
})
