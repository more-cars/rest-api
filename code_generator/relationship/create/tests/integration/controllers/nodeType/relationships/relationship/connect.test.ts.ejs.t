---
to: tests/integration/controllers/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/connect.test.ts
---
import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"

test('One of the nodes does not exist', async () => {
    <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .post('/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

    expect(response.statusCode)
        .toBe(404)
})

test('Both nodes are from the same type', async () => {
    vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'create<%= h.changeCase.pascal(relationshipName) %>Relationship')
        .mockImplementation(async () => {
            throw new Error('semantic error')
        })

    const response = await request(app)
        .post('/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/123')

    expect(response.statusCode)
        .toBe(500)
})

test('Both nodes exist and are valid relationship partners', async () => {
    <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship = vi.fn().mockReturnValue({
        relationship_id: 4
    })

    const response = await request(app)
        .post('/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

    expect(response.statusCode)
        .toBe(201)
})
