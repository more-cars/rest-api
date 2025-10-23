import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {RacingEvent} from "../../../../../../src/models/racing-events/RacingEvent"

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
            .get('/racing-events')

        expect(response.statusCode)
            .toBe(200)
    })
})
