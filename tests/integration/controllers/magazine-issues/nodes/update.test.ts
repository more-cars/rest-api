import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {MagazineIssue} from "../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeMagazineIssue} from "../../../../_toolbox/fixtures/nodes/FakeMagazineIssue"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update MAGAZINE ISSUE', () => {
    test('Node does not exist', async () => {
        vi.spyOn(MagazineIssue, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/magazine-issues/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        MagazineIssue.update = vi.fn().mockReturnValue(FakeMagazineIssue.modelOutput())

        const response = await request(app)
            .patch('/magazine-issues/42')
            .send({
                "title": "Sieger-Typen - Updated",
            })

        expect(response.statusCode)
            .toBe(201)
    })

    test.skip('Request is invalid', async () => {
        const response = await request(app)
            .patch('/magazine-issues/42') // payload is missing

        expect(response.statusCode)
            .toBe(400)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.MagazineIssue)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.title = null

        const response = await request(app)
            .patch('/magazine-issues/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.MagazineIssue)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.issue_year = null

        const response = await request(app)
            .patch('/magazine-issues/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(201)
    })

    test('Input is valid, but something breaks on the way', async () => {
        MagazineIssue.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/magazine-issues/42')
            .send({
                "title": "Sieger-Typen - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
