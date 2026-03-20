import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {Price} from "../../../../../../src/models/node-types/prices/Price"
import {FakePrice} from "../../../../../_toolbox/fixtures/nodes/FakePrice"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        Price.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/prices')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        Price.findAll = vi.fn().mockReturnValue([
            FakePrice.modelOutput,
            FakePrice.modelOutput,
            FakePrice.modelOutput,
        ])

        const response = await request(app)
            .get('/prices')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Price.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/prices')

        expect(response.statusCode)
            .toBe(500)
    })
})
