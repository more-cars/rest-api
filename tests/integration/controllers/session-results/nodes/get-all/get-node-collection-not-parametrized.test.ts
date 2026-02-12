import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {SessionResult} from "../../../../../../src/models/session-results/SessionResult"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        SessionResult.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/session-results')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        SessionResult.findAll = vi.fn().mockReturnValue([
            {
                id: 1,
                position: 1,
            }, {
                id: 2,
                position: 2,
            }, {
                id: 3,
                position: 3,
            }
        ])

        const response = await request(app)
            .get('/session-results')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        SessionResult.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/session-results')

        expect(response.statusCode)
            .toBe(500)
    })
})
