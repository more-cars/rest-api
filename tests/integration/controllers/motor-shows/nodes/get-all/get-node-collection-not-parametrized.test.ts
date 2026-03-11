import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {MotorShow} from "../../../../../../src/models/node-types/motor-shows/MotorShow"
import {FakeMotorShow} from "../../../../../_toolbox/fixtures/nodes/FakeMotorShow"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        MotorShow.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/motor-shows')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        MotorShow.findAll = vi.fn().mockReturnValue([
            FakeMotorShow.modelOutput,
            FakeMotorShow.modelOutput,
            FakeMotorShow.modelOutput,
        ])

        const response = await request(app)
            .get('/motor-shows')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        MotorShow.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/motor-shows')

        expect(response.statusCode)
            .toBe(500)
    })
})
