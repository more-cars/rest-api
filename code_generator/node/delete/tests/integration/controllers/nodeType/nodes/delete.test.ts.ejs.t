---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/delete.test.ts
---
import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

test('Expecting an error when the node does not exist', async () => {
    vi.spyOn(<%= h.changeCase.pascal(nodeType) %>, 'delete')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(-42)
        })

    const response = await request(app)
        .delete('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Deleting the node when it actually exists', async () => {
    <%= h.changeCase.pascal(nodeType) %>.delete = vi.fn().mockReturnValue(true)

    const response = await request(app)
        .delete('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/12345')

    expect(response.statusCode)
        .toBe(204)
})
