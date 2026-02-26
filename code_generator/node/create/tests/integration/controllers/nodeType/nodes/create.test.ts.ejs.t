---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/create.test.ts
---
import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {Fake<%= h.changeCase.pascal(nodeType) %>} from "../../../../_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"

test('Input data is valid', async () => {
    <%= h.changeCase.pascal(nodeType) %>.create = vi.fn().mockReturnValue(Fake<%= h.changeCase.pascal(nodeType) %>.modelOutput())

    const response = await request(app)
        .post('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>')
        .send({
<% for (prop in properties) { -%>
<%    if (properties[prop].mandatory && properties[prop].datatype === 'string') { -%>
            <%= prop %>: "<%= properties[prop].example %>",
<%    } else if (properties[prop].mandatory) { -%>
            <%= prop %>: <%= properties[prop].example -%>,
<%    } -%>
<% } -%>
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    <%= h.changeCase.pascal(nodeType) %>.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>')
        .send({
<% for (prop in properties) { -%>
<%    if (properties[prop].mandatory && properties[prop].datatype === 'string') { -%>
            <%= prop %>: "<%= properties[prop].example %>",
<%    } else if (properties[prop].mandatory) { -%>
            <%= prop %>: <%= properties[prop].example -%>,
<%    } -%>
<% } -%>
        })

    expect(response.statusCode)
        .toBe(500)
})
