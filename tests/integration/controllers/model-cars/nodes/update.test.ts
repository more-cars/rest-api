import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {ModelCar} from "../../../../../src/models/node-types/model-cars/ModelCar"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeModelCar} from "../../../../_toolbox/fixtures/nodes/FakeModelCar"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update MODEL CAR', () => {
    test('Node does not exist', async () => {
        vi.spyOn(ModelCar, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/model-cars/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        ModelCar.update = vi.fn().mockReturnValue(FakeModelCar.modelOutput())

        const response = await request(app)
            .patch('/model-cars/42')
            .send({
                "name": "BMW 2002 - Updated",
            })

        expect(response.statusCode)
            .toBe(201)
    })

    test.skip('Request is invalid', async () => {
        const response = await request(app)
            .patch('/model-cars/42') // payload is missing

        expect(response.statusCode)
            .toBe(400)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.ModelCar)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null

        const response = await request(app)
            .patch('/model-cars/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.ModelCar)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.scale = null

        const response = await request(app)
            .patch('/model-cars/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(201)
    })

    test('Input is valid, but something breaks on the way', async () => {
        ModelCar.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/model-cars/42')
            .send({
                "name": "BMW 2002 - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
