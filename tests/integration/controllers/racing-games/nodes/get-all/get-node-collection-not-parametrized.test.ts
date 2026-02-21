import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {RacingGame} from "../../../../../../src/models/node-types/racing-games/RacingGame"
import {FakeRacingGame} from "../../../../../_toolbox/fixtures/nodes/FakeRacingGame"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        RacingGame.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/racing-games')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        RacingGame.findAll = vi.fn().mockReturnValue([
            FakeRacingGame.modelOutput(),
            FakeRacingGame.modelOutput(),
            FakeRacingGame.modelOutput(),
        ])

        const response = await request(app)
            .get('/racing-games')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        RacingGame.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/racing-games')

        expect(response.statusCode)
            .toBe(500)
    })
})
