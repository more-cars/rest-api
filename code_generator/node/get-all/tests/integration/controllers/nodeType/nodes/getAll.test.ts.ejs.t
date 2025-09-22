---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/getAll.test.ts
---
import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"

test('No nodes exist', async () => {
    <%= h.changeCase.pascal(nodeType) %>.findAll = vi.fn().mockReturnValue([])

    const response = await request(app)
        .get('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>')

    expect(response.statusCode)
        .toBe(200)
})

test('Multiple nodes exist', async () => {
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
