---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/delete.test.ts
---
import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

test('Database request failed', async () => {
    vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'delete<%= h.changeCase.pascal(relationshipName) %>Relationship')
        .mockImplementation(async () => {
            throw new Error()
        })

    const response = await request(app)
        .delete('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/1234/<%= h.changeCase.kebab(relationshipName) %>/5678')

    expect(response.statusCode)
        .toBe(500)
})


test('<%= h.changeCase.title(startNodeType) %> does not exist', async () => {
    vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'delete<%= h.changeCase.pascal(relationshipName) %>Relationship')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(1234)
        })

    const response = await request(app)
        .delete('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/1234/<%= h.changeCase.kebab(relationshipName) %>/5678')

    expect(response.statusCode)
        .toBe(404)
})

test('<%= h.changeCase.title(startNodeType) %> exists, but has no relationship', async () => {
    vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'delete<%= h.changeCase.pascal(relationshipName) %>Relationship')
        .mockImplementation(async () => {
            throw new RelationshipNotFoundError('<%= h.changeCase.lower(relationshipName) %>', 1234, null)
        })

    const response = await request(app)
        .delete('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/1234/<%= h.changeCase.kebab(relationshipName) %>/5678')

    expect(response.statusCode)
        .toBe(404)
})

test('<%= h.changeCase.title(startNodeType) %> exists and has relationship', async () => {
    <%= h.changeCase.pascal(startNodeType) %>.delete<%= h.changeCase.pascal(relationshipName) %>Relationship = vi.fn().mockReturnValue(null)

    const response = await request(app)
        .delete('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/1234/<%= h.changeCase.kebab(relationshipName) %>/5678')

    expect(response.statusCode)
        .toBe(204)
})
