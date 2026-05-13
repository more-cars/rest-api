import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {CarModelVariant} from "../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeCarModelVariant} from "../../../../_toolbox/fixtures/nodes/FakeCarModelVariant"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update CAR MODEL VARIANT', () => {
    test('Node does not exist', async () => {
        vi.spyOn(CarModelVariant, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/car-model-variants/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        CarModelVariant.update = vi.fn().mockReturnValue(FakeCarModelVariant.modelOutput())

        const response = await request(app)
            .patch('/car-model-variants/42')
            .send({
                "name": "BMW M3 - Updated",
            })

        expect(response.statusCode)
            .toBe(201)
    })

    test.skip('Request is invalid', async () => {
        const response = await request(app)
            .patch('/car-model-variants/42') // payload is missing

        expect(response.statusCode)
            .toBe(400)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.CarModelVariant)
        const inputData = createdNode.properties
        // @ts-ignore
        inputData.name = null

        const response = await request(app)
            .patch('/car-model-variants/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.CarModelVariant)
        const inputData = createdNode.properties
        // @ts-ignore
        inputData.body_style = null

        const response = await request(app)
            .patch('/car-model-variants/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(201)
    })

    test('Input is valid, but something breaks on the way', async () => {
        CarModelVariant.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/car-model-variants/42')
            .send({
                "name": "BMW M3 - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
