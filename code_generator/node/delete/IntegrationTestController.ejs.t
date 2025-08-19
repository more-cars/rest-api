---
to: tests/integration/controllers/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/nodes/delete.test.ts
---
import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {<%= h.changeCase.pascal(nodetype) %>} from "../../../../../src/models/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/<%= h.changeCase.pascal(nodetype) %>"

test('Expecting error when node does not exist', async () => {
    <%= h.changeCase.pascal(nodetype) %>.delete = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .delete('/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Deleting node when it actually exists', async () => {
    <%= h.changeCase.pascal(nodetype) %>.delete = vi.fn().mockReturnValue(true)

    const response = await request(app)
        .delete('/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/12345')

    expect(response.statusCode)
        .toBe(204)
})
