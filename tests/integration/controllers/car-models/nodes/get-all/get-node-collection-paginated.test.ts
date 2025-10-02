import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../../../../src/app"
import {CarModel} from "../../../../../../src/models/car-models/CarModel"

describe('Expecting correct status code when requesting a paginated node collection', () => {
    test('when pagination parameter is valid', async () => {
        CarModel.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/car-models?page=1')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when pagination parameter is out of range', async () => {
        CarModel.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/car-models?page=9999')

        expect(response.statusCode)
            .toBe(200)
    })

    test.each([
        [0.9],
        [0],
        [-1],
        [-999],
        [-4.963],
        ['three'],
        [true],
        [false],
        [null],
    ])('when pagination parameter is invalid', async (page) => {
        CarModel.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/car-models?page=' + page)

        expect(response.statusCode)
            .toBe(400)
    })
})
