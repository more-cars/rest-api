import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {Company} from "../../../../../../src/models/node-types/companies/Company"
import {FakeCompany} from "../../../../../_toolbox/fixtures/nodes/FakeCompany"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        Company.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/companies')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        Company.findAll = vi.fn().mockReturnValue([
            FakeCompany.modelOutput(),
            FakeCompany.modelOutput(),
            FakeCompany.modelOutput(),
        ])

        const response = await request(app)
            .get('/companies')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Company.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/companies')

        expect(response.statusCode)
            .toBe(500)
    })
})
