import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {MotorShow} from "../../../../../src/models/node-types/motor-shows/MotorShow"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeMotorShow} from "../../../../_toolbox/fixtures/nodes/FakeMotorShow"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update MOTOR SHOW', () => {
    test('Node does not exist', async () => {
        vi.spyOn(MotorShow, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/motor-shows/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        MotorShow.update = vi.fn().mockReturnValue(FakeMotorShow.modelOutput())

        const response = await request(app)
            .patch('/motor-shows/42')
            .send({
                "name": "2017 IAA Frankfurt - Updated",
            })

        expect(response.statusCode)
            .toBe(200)
    })

    test('Request is empty', async () => {
        MotorShow.update = vi.fn().mockReturnValue(FakeMotorShow.modelOutput())

        const response = await request(app)
            .patch('/motor-shows/42') // payload is missing

        expect(response.statusCode)
            .toBe(200)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.MotorShow)
        const inputData = createdNode.properties
        inputData.name = null

        const response = await request(app)
            .patch('/motor-shows/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.MotorShow)
        const inputData = createdNode.properties
        inputData.date_from = null

        const response = await request(app)
            .patch('/motor-shows/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        MotorShow.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/motor-shows/42')
            .send({
                "name": "2017 IAA Frankfurt - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
