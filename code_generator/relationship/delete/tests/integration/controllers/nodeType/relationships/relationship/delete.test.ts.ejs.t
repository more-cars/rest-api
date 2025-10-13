---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/delete.test.ts
---
import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', () => {
    test('Providing valid data', async () => {
        <%= h.changeCase.pascal(startNodeType) %>.delete<%= h.changeCase.pascal(relationshipName) %>Relationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'delete<%= h.changeCase.pascal(relationshipName) %>Relationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'delete<%= h.changeCase.pascal(relationshipName) %>Relationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('<%= h.changeCase.kebab(relationshipName) %>', 123, 567)
            })

        const response = await request(app)
            .delete('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'delete<%= h.changeCase.pascal(relationshipName) %>Relationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
