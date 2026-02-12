---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/get-all/get-node-collection-not-parametrized.test.ts
---
import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        <%= h.changeCase.pascal(nodeType) %>.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        <%= h.changeCase.pascal(nodeType) %>.findAll = vi.fn().mockReturnValue([
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
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        <%= h.changeCase.pascal(nodeType) %>.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>')

        expect(response.statusCode)
            .toBe(500)
    })
})
