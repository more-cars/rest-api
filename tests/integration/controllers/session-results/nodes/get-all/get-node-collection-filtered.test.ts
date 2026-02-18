import {describe, expect, test, vi} from "vitest"
import {SessionResult} from "../../../../../../src/models/node-types/session-results/SessionResult"
import request from "supertest"
import {app} from "../../../../../../src/app"

describe('Expecting correct status code when requesting a filtered node collection', () => {
    test.each([
        ['id', 'gt', '1234'],
        ['id', '', '1234'],
        ['position', 'eq', 1],
        ['position', '', 1],
        ['', '', ''],
    ])('when filter parameters are valid: $0 $2 $1', async (filterByProperty, filterOperator, filterValue) => {
        SessionResult.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get(`/session-results?filter_by_property=${filterByProperty}&filter_value=${filterValue}&filter_operator=${filterOperator}`)

        expect(response.statusCode)
            .toBe(200)
    })

    test.each([
        ['id', 'gt', ''],
        ['', 'gt', '1234'],
        ['', '', '1234'],
        ['id', 'greaterThan', '1234'],
        ['id', 'avg', '1234'],
        ['position', 'equal', 1],
        ['position', 'contains', 1],
        ['unknown_property', 'eq', 'test'],
        ['42', 'neq', 'test'],
    ])('when filter parameters are invalid: $0 $1 $2', async (filterByProperty, filterOperator, filterValue) => {
        SessionResult.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get(`/session-results?filter_by_property=${filterByProperty}&filter_value=${filterValue}&filter_operator=${filterOperator}`)

        expect(response.statusCode)
            .toBe(400)
    })
})
