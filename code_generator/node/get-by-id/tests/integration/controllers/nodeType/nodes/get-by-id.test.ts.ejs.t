---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/get-by-id.test.ts
---
import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"

test('Node does not exist', async () => {
    <%= h.changeCase.pascal(nodeType) %>.findById = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    <%= h.changeCase.pascal(nodeType) %>.findById = vi.fn().mockReturnValue({
        id: 12345
    })

    const response = await request(app)
        .get('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/12345')

    expect(response.statusCode)
        .toBe(200)
})
