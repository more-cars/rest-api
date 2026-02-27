import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {Brand} from "../../../../../../src/models/node-types/brands/Brand"
import {FakeBrand} from "../../../../../_toolbox/fixtures/nodes/FakeBrand"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        Brand.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/brands')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        Brand.findAll = vi.fn().mockReturnValue([
            FakeBrand.modelOutput,
            FakeBrand.modelOutput,
            FakeBrand.modelOutput,
        ])

        const response = await request(app)
            .get('/brands')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Brand.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/brands')

        expect(response.statusCode)
            .toBe(500)
    })
})
