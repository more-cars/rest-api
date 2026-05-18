import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {RacingSeries} from "../../../../../src/models/node-types/racing-series/RacingSeries"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeRacingSeries} from "../../../../_toolbox/fixtures/nodes/FakeRacingSeries"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update RACING SERIES', () => {
    test('Node does not exist', async () => {
        vi.spyOn(RacingSeries, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/racing-series/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        RacingSeries.update = vi.fn().mockReturnValue(FakeRacingSeries.modelOutput())

        const response = await request(app)
            .patch('/racing-series/42')
            .send({
                "name": "Deutsche Tourenwagen-Masters - Updated",
            })

        expect(response.statusCode)
            .toBe(200)
    })

    test('Request is empty', async () => {
        RacingSeries.update = vi.fn().mockReturnValue(FakeRacingSeries.modelOutput())

        const response = await request(app)
            .patch('/racing-series/42') // payload is missing

        expect(response.statusCode)
            .toBe(200)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.RacingSeries)
        const inputData = createdNode.properties
        inputData.name = null

        const response = await request(app)
            .patch('/racing-series/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.RacingSeries)
        const inputData = createdNode.properties
        inputData.founded = null

        const response = await request(app)
            .patch('/racing-series/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        RacingSeries.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/racing-series/42')
            .send({
                "name": "Deutsche Tourenwagen-Masters - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
