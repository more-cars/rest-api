import {describe, expect, test, vi} from "vitest"
import {Rating} from "../../../../../../src/models/node-types/ratings/Rating"
import request from "supertest"
import {app} from "../../../../../../src/app"

describe('Expecting correct status code when requesting a filtered node collection', () => {
    test.each([
        ['id', 'gt', '1234'],
        ['id', '', '1234'],
        ['rating_value', 'eq', 'test'],
        ['rating_value', '', 'test'],
        ['', '', ''],
    ])('when filter parameters are valid: $0 $2 $1', async (filterByProperty, filterOperator, filterValue) => {
        Rating.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get(`/ratings?filter_by_property=${filterByProperty}&filter_value=${filterValue}&filter_operator=${filterOperator}`)

        expect(response.statusCode)
            .toBe(200)
    })

    test.each([
        ['id', 'gt', ''],
        ['', 'gt', '1234'],
        ['', '', '1234'],
        ['id', 'greaterThan', '1234'],
        ['id', 'avg', '1234'],
        ['rating_value', 'equal', 'test'],
        ['rating_value', 'contains', 'test'],
        ['unknown_property', 'eq', 'test'],
        ['42', 'neq', 'test'],
    ])('when filter parameters are invalid: $0 $1 $2', async (filterByProperty, filterOperator, filterValue) => {
        Rating.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get(`/ratings?filter_by_property=${filterByProperty}&filter_value=${filterValue}&filter_operator=${filterOperator}`)

        expect(response.statusCode)
            .toBe(400)
    })
})
