import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {MagazineIssue} from "../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {FakeMagazineIssue} from "../../../../../_toolbox/fixtures/nodes/FakeMagazineIssue"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        MagazineIssue.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/magazine-issues')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        MagazineIssue.findAll = vi.fn().mockReturnValue([
            FakeMagazineIssue.modelOutput,
            FakeMagazineIssue.modelOutput,
            FakeMagazineIssue.modelOutput,
        ])

        const response = await request(app)
            .get('/magazine-issues')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        MagazineIssue.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/magazine-issues')

        expect(response.statusCode)
            .toBe(500)
    })
})
