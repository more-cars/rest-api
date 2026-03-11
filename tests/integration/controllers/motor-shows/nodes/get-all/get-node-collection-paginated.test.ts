import {describe, expect, test, vi} from "vitest"
import {MotorShow} from "../../../../../../src/models/node-types/motor-shows/MotorShow"
import request from "supertest"
import {app} from "../../../../../../src/app"

describe('Expecting correct status code when requesting a paginated node collection', () => {
    test.each([
        ['1'],
        ['999'],
        ['']
    ])('when pagination parameter is valid: $0', async (page) => {
        MotorShow.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/motor-shows?page=' + page)

        expect(response.statusCode)
            .toBe(200)
    })

    test('when pagination parameter is out of range', async () => {
        MotorShow.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/motor-shows?page=9999')

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
        MotorShow.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/motor-shows?page=' + page)

        expect(response.statusCode)
            .toBe(400)
    })
})
