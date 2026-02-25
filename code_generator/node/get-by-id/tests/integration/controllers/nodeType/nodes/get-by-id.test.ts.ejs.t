---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/get-by-id.test.ts
---
import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a <%= h.changeCase.upper(nodeType) %> by ID', () => {
    test('when it does not exist', async () => {
        <%= h.changeCase.pascal(nodeType) %>.findById = vi.fn().mockImplementation(() => {
            throw new NodeNotFoundError(-42)
        })

        const response = await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('when it does exist', async () => {
        <%= h.changeCase.pascal(nodeType) %>.findById = vi.fn().mockReturnValue({
            node_type: ModelNodeType.<%= h.changeCase.pascal(nodeType) %>,
            attributes: {
                id: 12345,
            },
        })

        const response = await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/12345')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when the request is valid, but something breaks on the way', async () => {
        <%= h.changeCase.pascal(nodeType) %>.findById = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/12345')

        expect(response.statusCode)
            .toBe(500)
    })
})
