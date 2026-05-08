import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Company} from "../../../../../src/models/node-types/companies/Company"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {FakeCompany} from "../../../../_toolbox/fixtures/nodes/FakeCompany"

describe('Update COMPANY', () => {
    test('Node does not exist', async () => {
        vi.spyOn(Company, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/companies/-42')

        expect(response.statusCode)
            .toBe(400)
    })

    test('Input data is valid', async () => {
        Company.update = vi.fn().mockReturnValue(FakeCompany.modelOutput)

        const response = await request(app)
            .patch('/companies/42')
            .send({
                "name": "BMW AG - Updated",
            })

        expect(response.statusCode)
            .toBe(201)
    })

    test('Input data is structurally invalid', async () => {
        const response = await request(app)
            .patch('/companies/42')
            .send({
                name: null // mandatory field is removed
            })

        expect(response.statusCode)
            .toBe(400)
    })

    test('Request is invalid', async () => {
        const response = await request(app)
            .patch('/companies/42') // payload is missing

        expect(response.statusCode)
            .toBe(400)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Company.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/companies/42')
            .send({
                "name": "BMW AG - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
