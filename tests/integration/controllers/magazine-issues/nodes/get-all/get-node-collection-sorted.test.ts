import {describe, expect, test, vi} from "vitest"
import {MagazineIssue} from "../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import request from "supertest"
import {app} from "../../../../../../src/app"

describe('Expecting correct status code when requesting a sorted node collection', () => {
    test.each([
        ['id', 'asc'],
        ['title', 'asc'],
        ['title', 'desc'],
        ['', 'desc'],
        ['title', ''],
    ])('when sorting parameters are valid: $0 $1', async (sortByProperty, sortDirection) => {
        MagazineIssue.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get(`/magazine-issues?sort_by_property=${sortByProperty}&sort_direction=${sortDirection}`)

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
        MagazineIssue.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get(`/magazine-issues?sort_by_property=${sortByProperty}&sort_direction=${sortDirection}`)

        expect(response.statusCode)
            .toBe(400)
    })
})
