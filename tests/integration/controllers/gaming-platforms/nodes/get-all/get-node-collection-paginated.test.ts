import {describe, expect, test, vi} from "vitest"
import {GamingPlatform} from "../../../../../../src/models/gaming-platforms/GamingPlatform"
import request from "supertest"
import {app} from "../../../../../../src/app"

describe('Expecting correct status code when requesting a paginated node collection', () => {
    test.each([
        ['1'],
        ['999'],
        ['']
    ])('when pagination parameter is valid: $0', async (page) => {
        GamingPlatform.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/gaming-platforms?page=' + page)

        expect(response.statusCode)
            .toBe(200)
    })

    test('when pagination parameter is out of range', async () => {
        GamingPlatform.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/gaming-platforms?page=9999')

        expect(response.statusCode)
            .toBe(200)
    })

    test.each([
        ['0.9'],
        ['0'],
        ['-1'],
        ['-999'],
        ['-4.963'],
        ['three'],
        ['true'],
        ['false'],
        ['null']
    ])('when pagination parameter is invalid: $0', async (page) => {
        GamingPlatform.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/gaming-platforms?page=' + page)

        expect(response.statusCode)
            .toBe(400)
    })
})
