import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"
import {FakeRacingEvent} from "../../../../../_toolbox/fixtures/nodes/FakeRacingEvent"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        RacingEvent.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/racing-events')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        RacingEvent.findAll = vi.fn().mockReturnValue([
            FakeRacingEvent.modelOutput(),
            FakeRacingEvent.modelOutput(),
            FakeRacingEvent.modelOutput(),
        ])

        const response = await request(app)
            .get('/racing-events')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        RacingEvent.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/racing-events')

        expect(response.statusCode)
            .toBe(500)
    })
})
