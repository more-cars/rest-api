---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/get-all.test.ts
---
import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›<%= h.changeCase.kebab(relationshipName) %>‹ relationships', () => {
    test('Providing valid data', async () => {
        <%= h.changeCase.pascal(startNodeType) %>.getAll<%= h.changeCase.pascal(relationshipName) %>Relationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>),
            getFakeRel(RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>),
            getFakeRel(RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>),
        ])

        const response = await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        <%= h.changeCase.pascal(startNodeType) %>.getAll<%= h.changeCase.pascal(relationshipName) %>Relationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'getAll<%= h.changeCase.pascal(relationshipName) %>Relationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'getAll<%= h.changeCase.pascal(relationshipName) %>Relationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>')

        expect(response.statusCode)
            .toBe(404)
    })
})
