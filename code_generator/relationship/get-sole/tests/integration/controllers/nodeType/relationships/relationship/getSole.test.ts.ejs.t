---
to: tests/integration/controllers/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/getSole.test.ts
---
import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

test('<%= h.changeCase.title(startNodeType) %> does not exist', async () => {
    vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'get<%= h.changeCase.pascal(relationshipName) %>Relationship')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(1234)
        })

    const response = await request(app)
        .get('/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/1234/<%= h.changeCase.kebab(relationshipName) %>')

    expect(response.statusCode)
        .toBe(404)
})

test('<%= h.changeCase.title(startNodeType) %> exists, but has no relationship', async () => {
    vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'get<%= h.changeCase.pascal(relationshipName) %>Relationship')
        .mockImplementation(async () => {
            throw new RelationshipNotFoundError('<%= h.changeCase.lower(relationshipName) %>', 1234, null)
        })

    const response = await request(app)
        .get('/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/1234/<%= h.changeCase.kebab(relationshipName) %>')

    expect(response.statusCode)
        .toBe(200)
})

test('<%= h.changeCase.title(startNodeType) %> exists and has relationship', async () => {
    <%= h.changeCase.pascal(startNodeType) %>.get<%= h.changeCase.pascal(relationshipName) %>Relationship = vi.fn().mockReturnValue({
        relationship_id: 4
    })

    const response = await request(app)
        .get('/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/1234/<%= h.changeCase.kebab(relationshipName) %>')

    expect(response.statusCode)
        .toBe(200)
})
