---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/getAll.test.ts
---
import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

test('<%= h.changeCase.title(startNodeType) %> does not exist', async () => {
    vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'getAll<%= h.changeCase.pascal(relationshipName) %>Relationships')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(1234)
        })

    const response = await request(app)
        .get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/1234/<%= h.changeCase.kebab(relationshipName) %>')

    expect(response.statusCode)
        .toBe(404)
})

test('<%= h.changeCase.title(startNodeType) %> exists, but has no relationships', async () => {
    <%= h.changeCase.pascal(startNodeType) %>.getAll<%= h.changeCase.pascal(relationshipName) %>Relationships = vi.fn().mockReturnValue([])

    const response = await request(app)
        .get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/1234/<%= h.changeCase.kebab(relationshipName) %>')

    expect(response.statusCode)
        .toBe(200)
})

test('<%= h.changeCase.title(startNodeType) %> exists and has relationships', async () => {
    <%= h.changeCase.pascal(startNodeType) %>.getAll<%= h.changeCase.pascal(relationshipName) %>Relationships = vi.fn().mockReturnValue([
        {
            relationship_id: 4,
            relationship_name: '<%= h.changeCase.kebab(relationshipName) %>',
        }, {
            relationship_id: 5,
            relationship_name: '<%= h.changeCase.kebab(relationshipName) %>',
        }, {
            relationship_id: 6,
            relationship_name: '<%= h.changeCase.kebab(relationshipName) %>',
        }
    ])

    const response = await request(app)
        .get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/1234/<%= h.changeCase.kebab(relationshipName) %>')

    expect(response.statusCode)
        .toBe(200)
})
