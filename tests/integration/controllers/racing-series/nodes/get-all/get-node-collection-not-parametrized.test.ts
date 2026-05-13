import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {RacingSeries} from "../../../../../../src/models/node-types/racing-series/RacingSeries"
import {FakeRacingSeries} from "../../../../../_toolbox/fixtures/nodes/FakeRacingSeries"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        RacingSeries.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/racing-series')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        RacingSeries.findAll = vi.fn().mockReturnValue([
            FakeRacingSeries.modelOutput(),
            FakeRacingSeries.modelOutput(),
            FakeRacingSeries.modelOutput(),
        ])

        const response = await request(app)
            .get('/racing-series')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        RacingSeries.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/racing-series')

        expect(response.statusCode)
            .toBe(500)
    })
})
