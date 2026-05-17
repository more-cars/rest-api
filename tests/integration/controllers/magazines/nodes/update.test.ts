import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Magazine} from "../../../../../src/models/node-types/magazines/Magazine"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeMagazine} from "../../../../_toolbox/fixtures/nodes/FakeMagazine"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update MAGAZINE', () => {
    test('Node does not exist', async () => {
        vi.spyOn(Magazine, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/magazines/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        Magazine.update = vi.fn().mockReturnValue(FakeMagazine.modelOutput())

        const response = await request(app)
            .patch('/magazines/42')
            .send({
                "name": "Top Gear - Updated",
            })

        expect(response.statusCode)
            .toBe(200)
    })

    test.skip('Request is invalid', async () => {
        const response = await request(app)
            .patch('/magazines/42') // payload is missing

        expect(response.statusCode)
            .toBe(400)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.Magazine)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null

        const response = await request(app)
            .patch('/magazines/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.Magazine)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.focus = null

        const response = await request(app)
            .patch('/magazines/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Magazine.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/magazines/42')
            .send({
                "name": "Top Gear - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
