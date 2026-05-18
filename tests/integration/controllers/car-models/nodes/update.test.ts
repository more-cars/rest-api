import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeCarModel} from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update CAR MODEL', () => {
    test('Node does not exist', async () => {
        vi.spyOn(CarModel, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/car-models/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        CarModel.update = vi.fn().mockReturnValue(FakeCarModel.modelOutput())

        const response = await request(app)
            .patch('/car-models/42')
            .send({
                "name": "Corvette - Updated",
            })

        expect(response.statusCode)
            .toBe(200)
    })

    test('Request is empty', async () => {
        CarModel.update = vi.fn().mockReturnValue(FakeCarModel.modelOutput())

        const response = await request(app)
            .patch('/car-models/42') // payload is missing

        expect(response.statusCode)
            .toBe(200)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.CarModel)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null

        const response = await request(app)
            .patch('/car-models/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.CarModel)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.built_from = null

        const response = await request(app)
            .patch('/car-models/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        CarModel.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/car-models/42')
            .send({
                "name": "Corvette - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
