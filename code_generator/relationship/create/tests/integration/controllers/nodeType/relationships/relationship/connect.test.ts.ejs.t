---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/connect.test.ts
---
import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Creating a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship with valid data', async () => {
    <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship = vi.fn().mockReturnValue({
        relationship_id: 4,
        relationship_name: '<%= h.changeCase.kebab(relationshipName) %>',
    })

    const response = await request(app)
        .post('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

    expect(response.statusCode)
        .toBe(201)
})

test('Trying to create the same ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship again', async () => {
    vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'create<%= h.changeCase.pascal(relationshipName) %>Relationship')
        .mockImplementation(async () => {
            throw new RelationshipAlreadyExistsError('<%= h.changeCase.kebab(relationshipName) %>', 123, 567)
        })

    const response = await request(app)
        .post('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

    expect(response.statusCode)
        .toBe(304)
})

test('Trying to create a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship with nodes that do not exist', async () => {
    vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'create<%= h.changeCase.pascal(relationshipName) %>Relationship')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(123)
        })

    const response = await request(app)
        .post('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

    expect(response.statusCode)
        .toBe(404)
})

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'create<%= h.changeCase.pascal(relationshipName) %>Relationship')
        .mockImplementation(async () => {
            throw new Error('Arbitrary error')
        })

    const response = await request(app)
        .post('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/123')

    expect(response.statusCode)
        .toBe(500)
})
