import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {ModelCarBrand} from "../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {FakeModelCarBrand} from "../../../../../_toolbox/fixtures/nodes/FakeModelCarBrand"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        ModelCarBrand.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/model-car-brands')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        ModelCarBrand.findAll = vi.fn().mockReturnValue([
            FakeModelCarBrand.modelOutput,
            FakeModelCarBrand.modelOutput,
            FakeModelCarBrand.modelOutput,
        ])

        const response = await request(app)
            .get('/model-car-brands')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        ModelCarBrand.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/model-car-brands')

        expect(response.statusCode)
            .toBe(500)
    })
})
