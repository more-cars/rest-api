import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {LapTime} from "../../../../../src/models/node-types/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeLapTime} from "../../../../_toolbox/fixtures/nodes/FakeLapTime"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update LAP TIME', () => {
    test('Node does not exist', async () => {
        vi.spyOn(LapTime, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/lap-times/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        LapTime.update = vi.fn().mockReturnValue(FakeLapTime.modelOutput())

        const response = await request(app)
            .patch('/lap-times/42')
            .send({
                "time": "PT1M33.294S - Updated",
                "driver_name": "Klaus Ludwig - Updated",
            })

        expect(response.statusCode)
            .toBe(201)
    })

    test.skip('Request is invalid', async () => {
        const response = await request(app)
            .patch('/lap-times/42') // payload is missing

        expect(response.statusCode)
            .toBe(400)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.LapTime)
        const inputData = createdNode.properties
        // @ts-ignore
        inputData.driver_name = null

        const response = await request(app)
            .patch('/lap-times/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.LapTime)
        const inputData = createdNode.properties
        // @ts-ignore
        inputData.date = null

        const response = await request(app)
            .patch('/lap-times/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(201)
    })

    test('Input is valid, but something breaks on the way', async () => {
        LapTime.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/lap-times/42')
            .send({
                "time": "PT1M33.294S - Updated",
                "driver_name": "Klaus Ludwig - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
