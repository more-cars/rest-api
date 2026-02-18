import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {Image} from "../../../../../../src/models/node-types/images/Image"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        Image.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/images')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        Image.findAll = vi.fn().mockReturnValue([
            {
                id: 1,
                name: "dummy",
            }, {
                id: 2,
                name: "dummy",
            }, {
                id: 3,
                name: "dummy",
            }
        ])

        const response = await request(app)
            .get('/images')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Image.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/images')

        expect(response.statusCode)
            .toBe(500)
    })
})
