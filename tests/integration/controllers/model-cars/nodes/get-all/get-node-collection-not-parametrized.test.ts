import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {ModelCar} from "../../../../../../src/models/node-types/model-cars/ModelCar"
import {FakeModelCar} from "../../../../../_toolbox/fixtures/nodes/FakeModelCar"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        ModelCar.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/model-cars')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        ModelCar.findAll = vi.fn().mockReturnValue([
            FakeModelCar.modelOutput,
            FakeModelCar.modelOutput,
            FakeModelCar.modelOutput,
        ])

        const response = await request(app)
            .get('/model-cars')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        ModelCar.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/model-cars')

        expect(response.statusCode)
            .toBe(500)
    })
})
