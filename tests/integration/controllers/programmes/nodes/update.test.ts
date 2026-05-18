import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Programme} from "../../../../../src/models/node-types/programmes/Programme"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeProgramme} from "../../../../_toolbox/fixtures/nodes/FakeProgramme"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update PROGRAMME', () => {
    test('Node does not exist', async () => {
        vi.spyOn(Programme, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/programmes/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        Programme.update = vi.fn().mockReturnValue(FakeProgramme.modelOutput())

        const response = await request(app)
            .patch('/programmes/42')
            .send({
                "name": "Top Gear - Updated",
            })

        expect(response.statusCode)
            .toBe(200)
    })

    test('Request is empty', async () => {
        Programme.update = vi.fn().mockReturnValue(FakeProgramme.modelOutput())

        const response = await request(app)
            .patch('/programmes/42') // payload is missing

        expect(response.statusCode)
            .toBe(200)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.Programme)
        const inputData = createdNode.properties
        inputData.name = null

        const response = await request(app)
            .patch('/programmes/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.Programme)
        const inputData = createdNode.properties
        inputData.channel = null

        const response = await request(app)
            .patch('/programmes/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Programme.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/programmes/42')
            .send({
                "name": "Top Gear - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
