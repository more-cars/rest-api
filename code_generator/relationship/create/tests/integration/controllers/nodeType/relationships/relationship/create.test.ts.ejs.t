---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/create.test.ts
---
import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"

describe('Creating a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', () => {
    test('Providing valid data', async () => {
        <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        })

        const response = await request(app)
            .post('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'create<%= h.changeCase.pascal(relationshipName) %>Relationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'create<%= h.changeCase.pascal(relationshipName) %>Relationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(<%= h.changeCase.pascal(startNodeType) %>, 'create<%= h.changeCase.pascal(relationshipName) %>Relationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('<%= h.changeCase.kebab(relationshipName) %>', 123, 567)
            })

        const response = await request(app)
            .post('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
