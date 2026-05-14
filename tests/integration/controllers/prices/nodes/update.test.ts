import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Price} from "../../../../../src/models/node-types/prices/Price"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakePrice} from "../../../../_toolbox/fixtures/nodes/FakePrice"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update PRICE', () => {
    test('Node does not exist', async () => {
        vi.spyOn(Price, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/prices/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        Price.update = vi.fn().mockReturnValue(FakePrice.modelOutput())

        const response = await request(app)
            .patch('/prices/42')
            .send({
                "price": 59992,
                "price_year": 2022,
                "currency_code": "EUR - Updated",
                "country_code": "DE - Updated",
            })

        expect(response.statusCode)
            .toBe(201)
    })

    test.skip('Request is invalid', async () => {
        const response = await request(app)
            .patch('/prices/42') // payload is missing

        expect(response.statusCode)
            .toBe(400)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.Price)
        const inputData = createdNode.properties
        // @ts-ignore
        inputData.price = null

        const response = await request(app)
            .patch('/prices/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Price.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/prices/42')
            .send({
                "price": 59992,
                "price_year": 2022,
                "currency_code": "GBP",
                "country_code": "GB",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
