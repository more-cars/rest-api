import {describe, expect, test, vi} from "vitest"
import {Company} from "../../../../../../src/models/node-types/companies/Company"
import request from "supertest"
import {app} from "../../../../../../src/app"

describe('Expecting correct status code when requesting a sorted node collection', () => {
    test.each([
        ['id', 'asc'],
        ['name', 'asc'],
        ['name', 'desc'],
        ['', 'desc'],
        ['name', ''],
    ])('when sorting parameters are valid: $0 $1', async (sortByProperty, sortDirection) => {
        Company.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get(`/companies?sort_by_property=${sortByProperty}&sort_direction=${sortDirection}`)

        expect(response.statusCode)
            .toBe(200)
    })

    test.each([
        ['id', 'ascending'],
        ['id', 'up'],
        ['id', 'null'],
        ['id', 'true'],
        ['id', 'false'],
        ['unknown_property', 'asc'],
        ['42', 'asc'],
        ['42', 'up'],
    ])('when sorting parameters are invalid: $0 $1', async (sortByProperty, sortDirection) => {
        Company.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get(`/companies?sort_by_property=${sortByProperty}&sort_direction=${sortDirection}`)

        expect(response.statusCode)
            .toBe(400)
    })
})
