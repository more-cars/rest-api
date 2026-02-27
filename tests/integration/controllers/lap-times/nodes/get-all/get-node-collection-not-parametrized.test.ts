import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {LapTime} from "../../../../../../src/models/node-types/lap-times/LapTime"
import {FakeLapTime} from "../../../../../_toolbox/fixtures/nodes/FakeLapTime"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        LapTime.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/lap-times')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        LapTime.findAll = vi.fn().mockReturnValue([
            FakeLapTime.modelOutput,
            FakeLapTime.modelOutput,
            FakeLapTime.modelOutput,
        ])

        const response = await request(app)
            .get('/lap-times')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        LapTime.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/lap-times')

        expect(response.statusCode)
            .toBe(500)
    })
})
