import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {Rating} from "../../../../../../src/models/node-types/ratings/Rating"
import {FakeRating} from "../../../../../_toolbox/fixtures/nodes/FakeRating"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        Rating.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/ratings')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        Rating.findAll = vi.fn().mockReturnValue([
            FakeRating.modelOutput,
            FakeRating.modelOutput,
            FakeRating.modelOutput,
        ])

        const response = await request(app)
            .get('/ratings')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Rating.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/ratings')

        expect(response.statusCode)
            .toBe(500)
    })
})
