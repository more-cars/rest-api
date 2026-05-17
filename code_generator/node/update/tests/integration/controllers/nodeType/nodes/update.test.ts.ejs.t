---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/update.test.ts
---
<% const properties = JSON.parse(props) -%>
import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {Fake<%= h.changeCase.pascal(nodeType) %>} from "../../../../_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update <%= h.changeCase.upper(nodeType) %>', () => {
    test('Node does not exist', async () => {
        vi.spyOn(<%= h.changeCase.pascal(nodeType) %>, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        <%= h.changeCase.pascal(nodeType) %>.update = vi.fn().mockReturnValue(Fake<%= h.changeCase.pascal(nodeType) %>.modelOutput())

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
            .toBe(200)
    })

    test.skip('Request is invalid', async () => {
        const response = await request(app)
            .patch('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/42') // payload is missing

        expect(response.statusCode)
            .toBe(400)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null

        const response = await request(app)
            .patch('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData. = null // <- select an optional field

        const response = await request(app)
            .patch('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(200)
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
