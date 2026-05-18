import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update BRAND', () => {
    test('Node does not exist', async () => {
        vi.spyOn(Brand, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/brands/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        Brand.update = vi.fn().mockReturnValue(FakeBrand.modelOutput())

        const response = await request(app)
            .patch('/brands/42')
            .send({
                "name": "BMW - Updated",
            })

        expect(response.statusCode)
            .toBe(200)
    })

    test('Request is empty', async () => {
        Brand.update = vi.fn().mockReturnValue(FakeBrand.modelOutput())

        const response = await request(app)
            .patch('/brands/42') // payload is missing

        expect(response.statusCode)
            .toBe(200)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.Brand)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null

        const response = await request(app)
            .patch('/brands/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.Brand)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.founded = null

        const response = await request(app)
            .patch('/brands/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Brand.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/brands/42')
            .send({
                "name": "BMW - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
