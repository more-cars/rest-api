import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {CarModel} from "../../../../../../src/models/node-types/car-models/CarModel"
import {FakeCarModel} from "../../../../../_toolbox/fixtures/nodes/FakeCarModel"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        CarModel.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/car-models')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        CarModel.findAll = vi.fn().mockReturnValue([
            FakeCarModel.modelOutput(),
            FakeCarModel.modelOutput(),
            FakeCarModel.modelOutput(),
        ])

        const response = await request(app)
            .get('/car-models')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        CarModel.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/car-models')

        expect(response.statusCode)
            .toBe(500)
    })
})
