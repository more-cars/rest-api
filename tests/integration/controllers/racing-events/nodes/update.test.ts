import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {RacingEvent} from "../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeRacingEvent} from "../../../../_toolbox/fixtures/nodes/FakeRacingEvent"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update RACING EVENT', () => {
    test('Node does not exist', async () => {
        vi.spyOn(RacingEvent, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/racing-events/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        RacingEvent.update = vi.fn().mockReturnValue(FakeRacingEvent.modelOutput())

        const response = await request(app)
            .patch('/racing-events/42')
            .send({
                "name": "GP Monaco - Updated",
            })

        expect(response.statusCode)
            .toBe(201)
    })

    test.skip('Request is invalid', async () => {
        const response = await request(app)
            .patch('/racing-events/42') // payload is missing

        expect(response.statusCode)
            .toBe(400)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.RacingEvent)
        const inputData = createdNode.properties
        // @ts-ignore
        inputData.name = null

        const response = await request(app)
            .patch('/racing-events/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.RacingEvent)
        const inputData = createdNode.properties
        // @ts-ignore
        inputData.date_from = null

        const response = await request(app)
            .patch('/racing-events/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(201)
    })

    test('Input is valid, but something breaks on the way', async () => {
        RacingEvent.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/racing-events/42')
            .send({
                "name": "GP Monaco - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
