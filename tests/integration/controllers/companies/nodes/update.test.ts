import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Company} from "../../../../../src/models/node-types/companies/Company"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeCompany} from "../../../../_toolbox/fixtures/nodes/FakeCompany"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update COMPANY', () => {
    test('Node does not exist', async () => {
        vi.spyOn(Company, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/companies/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        Company.update = vi.fn().mockReturnValue(FakeCompany.modelOutput())

        const response = await request(app)
            .patch('/companies/42')
            .send({
                "name": "BMW AG - Updated",
            })

        expect(response.statusCode)
            .toBe(200)
    })

    test('Request is empty', async () => {
        Company.update = vi.fn().mockReturnValue(FakeCompany.modelOutput())

        const response = await request(app)
            .patch('/companies/42') // payload is missing

        expect(response.statusCode)
            .toBe(200)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.Company)
        const inputData = createdNode.properties
        inputData.name = null

        const response = await request(app)
            .patch('/companies/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.Company)
        const inputData = createdNode.properties
        inputData.founded = null

        const response = await request(app)
            .patch('/companies/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(200)
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
