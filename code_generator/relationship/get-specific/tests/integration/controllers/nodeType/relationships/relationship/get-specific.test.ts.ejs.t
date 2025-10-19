---
to: tests/integration/controllers/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/get-specific.test.ts
---
import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a specific ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', () => {
    test('Providing valid data', async () => {
        <%= h.changeCase.pascal(startNodeType) %>.has<%= h.changeCase.pascal(relationshipName) %>Relationship = vi.fn().mockReturnValue({
            id: 4,
            type: '<%= h.changeCase.kebab(relationshipName) %>',
        })

        const response = await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing invalid data (nodes do not exist)', async () => {
        vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'getSpecific<%= h.changeCase.pascal(relationshipName) %>Relationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (relationship does not exist)', async () => {
        vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'getSpecific<%= h.changeCase.pascal(relationshipName) %>Relationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('<%= h.changeCase.lower(relationshipName) %>', 123)
            })

        const response = await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'getSpecific<%= h.changeCase.pascal(relationshipName) %>Relationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
