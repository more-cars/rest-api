---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/get-all/get-node-collection-filtered.test.ts
---
import {describe, expect, test, vi} from "vitest"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import request from "supertest"
import {app} from "../../../../../../src/app"

describe('Expecting correct status code when requesting a filtered node collection', () => {
    test.each([
        ['id', 'gt', '1234'],
        ['id', '', '1234'],
        ['name', 'eq', 'test'],
        ['name', '', 'test'],
        ['', '', ''],
    ])('when filter parameters are valid: $0 $2 $1', async (filterByProperty, filterOperator, filterValue) => {
        <%= h.changeCase.pascal(nodeType) %>.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get(`/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>?filter_by_property=${filterByProperty}&filter_value=${filterValue}&filter_operator=${filterOperator}`)

        expect(response.statusCode)
            .toBe(200)
    })

    test.each([
        ['id', 'gt', ''],
        ['', 'gt', '1234'],
        ['', '', '1234'],
        ['id', 'greaterThan', '1234'],
        ['id', 'avg', '1234'],
        ['name', 'equal', 'test'],
        ['name', 'contains', 'test'],
        ['unknown_property', 'eq', 'test'],
        ['42', 'neq', 'test'],
    ])('when filter parameters are invalid: $0 $1 $2', async (filterByProperty, filterOperator, filterValue) => {
        <%= h.changeCase.pascal(nodeType) %>.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get(`/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>?filter_by_property=${filterByProperty}&filter_value=${filterValue}&filter_operator=${filterOperator}`)

        expect(response.statusCode)
            .toBe(400)
    })
})
