import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {Magazine} from "../../../../../../src/models/node-types/magazines/Magazine"
import {FakeMagazine} from "../../../../../_toolbox/fixtures/nodes/FakeMagazine"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        Magazine.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/magazines')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        Magazine.findAll = vi.fn().mockReturnValue([
            FakeMagazine.modelOutput(),
            FakeMagazine.modelOutput(),
            FakeMagazine.modelOutput(),
        ])

        const response = await request(app)
            .get('/magazines')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Magazine.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/magazines')

        expect(response.statusCode)
            .toBe(500)
    })
})
