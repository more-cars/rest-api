import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {GamingPlatform} from "../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeGamingPlatform} from "../../../../_toolbox/fixtures/nodes/FakeGamingPlatform"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update GAMING PLATFORM', () => {
    test('Node does not exist', async () => {
        vi.spyOn(GamingPlatform, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/gaming-platforms/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        GamingPlatform.update = vi.fn().mockReturnValue(FakeGamingPlatform.modelOutput())

        const response = await request(app)
            .patch('/gaming-platforms/42')
            .send({
                "name": "PlayStation 5 - Updated",
            })

        expect(response.statusCode)
            .toBe(200)
    })

    test('Request is empty', async () => {
        GamingPlatform.update = vi.fn().mockReturnValue(FakeGamingPlatform.modelOutput())

        const response = await request(app)
            .patch('/gaming-platforms/42') // payload is missing

        expect(response.statusCode)
            .toBe(200)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.GamingPlatform)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null

        const response = await request(app)
            .patch('/gaming-platforms/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.GamingPlatform)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.release_year = null

        const response = await request(app)
            .patch('/gaming-platforms/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        GamingPlatform.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/gaming-platforms/42')
            .send({
                "name": "PlayStation 5 - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
