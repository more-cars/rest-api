import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {SessionResult} from "../../../../../src/models/node-types/session-results/SessionResult"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeSessionResult} from "../../../../_toolbox/fixtures/nodes/FakeSessionResult"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update SESSION RESULT', () => {
    test('Node does not exist', async () => {
        vi.spyOn(SessionResult, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/session-results/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        SessionResult.update = vi.fn().mockReturnValue(FakeSessionResult.modelOutput())

        const response = await request(app)
            .patch('/session-results/42')
            .send({
                "position": 3,
                "driver_name": "Lewis Hamilton - Updated",
            })

        expect(response.statusCode)
            .toBe(201)
    })

    test.skip('Request is invalid', async () => {
        const response = await request(app)
            .patch('/session-results/42') // payload is missing

        expect(response.statusCode)
            .toBe(400)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.SessionResult)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.position = null

        const response = await request(app)
            .patch('/session-results/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.SessionResult)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.team_name = null

        const response = await request(app)
            .patch('/session-results/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(201)
    })

    test('Input is valid, but something breaks on the way', async () => {
        SessionResult.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/session-results/42')
            .send({
                "position": 3,
                "driver_name": "Lewis Hamilton - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
