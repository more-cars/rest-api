import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {Programme} from "../../../../../../src/models/node-types/programmes/Programme"
import {FakeProgramme} from "../../../../../_toolbox/fixtures/nodes/FakeProgramme"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        Programme.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/programmes')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        Programme.findAll = vi.fn().mockReturnValue([
            FakeProgramme.modelOutput,
            FakeProgramme.modelOutput,
            FakeProgramme.modelOutput,
        ])

        const response = await request(app)
            .get('/programmes')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Programme.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/programmes')

        expect(response.statusCode)
            .toBe(500)
    })
})
