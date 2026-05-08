---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/update.test.ts
---
<% const properties = JSON.parse(props) -%>
import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {Fake<%= h.changeCase.pascal(nodeType) %>} from "../../../../_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"

describe('Update <%= h.changeCase.upper(nodeType) %>', () => {
    test('Node does not exist', async () => {
        vi.spyOn(<%= h.changeCase.pascal(nodeType) %>, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/-42')

        expect(response.statusCode)
            .toBe(400)
    })

    test('Input data is valid', async () => {
        <%= h.changeCase.pascal(nodeType) %>.update = vi.fn().mockReturnValue(Fake<%= h.changeCase.pascal(nodeType) %>.modelOutput)

        const response = await request(app)
            .patch('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/42')
            .send({
<% properties.forEach(prop => { -%>
<%   if (prop.mandatory && prop.datatype === 'string') { -%>
                "<%= prop.name %>": "<%= prop.example %> - Updated",
<%   } else if (prop.mandatory) { -%>
                "<%= prop.name %>": <%= prop.example + 2 -%>,
<%   } -%>
<% }) -%>
            })

        expect(response.statusCode)
            .toBe(201)
    })

    test('Input data is structurally invalid', async () => {
        const response = await request(app)
            .patch('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/42')
            .send({
                name: null // mandatory field is removed
            })

        expect(response.statusCode)
            .toBe(400)
    })

    test('Request is invalid', async () => {
        const response = await request(app)
            .patch('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/42') // payload is missing

        expect(response.statusCode)
            .toBe(400)
    })

    test('Input is valid, but something breaks on the way', async () => {
        <%= h.changeCase.pascal(nodeType) %>.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/42')
            .send({
<% properties.forEach(prop => { -%>
<%   if (prop.mandatory && prop.datatype === 'string') { -%>
                "<%= prop.name %>": "<%= prop.example %> - Updated",
<%   } else if (prop.mandatory) { -%>
                "<%= prop.name %>": <%= prop.example + 2 -%>,
<%   } -%>
<% }) -%>
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
