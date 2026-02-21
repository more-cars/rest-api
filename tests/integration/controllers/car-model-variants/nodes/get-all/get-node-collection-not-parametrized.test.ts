import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {CarModelVariant} from "../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {FakeCarModelVariant} from "../../../../../_toolbox/fixtures/nodes/FakeCarModelVariant"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        CarModelVariant.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/car-model-variants')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        CarModelVariant.findAll = vi.fn().mockReturnValue([
            FakeCarModelVariant.modelOutput(),
            FakeCarModelVariant.modelOutput(),
            FakeCarModelVariant.modelOutput(),
        ])

        const response = await request(app)
            .get('/car-model-variants')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        CarModelVariant.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/car-model-variants')

        expect(response.statusCode)
            .toBe(500)
    })
})
