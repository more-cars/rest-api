---
to: tests/integration/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/create.test.ts
---
import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"

test('Input data is valid', async () => {
    <%= h.changeCase.pascal(nodeType) %>.create = vi.fn().mockReturnValue({
        id: 12345,
<% for (prop in properties) { -%>
<%    if (properties[prop].mandatory && properties[prop].datatype === 'string') { -%>
        <%= prop %>: "<%= properties[prop].example %>",
<%    } else if (properties[prop].mandatory) { -%>
        <%= prop %>: <%= properties[prop].example -%>,
<%    } -%>
<% } -%>
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
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input data is semantically invalid', async () => {
    const response = await request(app)
        .post('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>') // payload is missing

    expect(response.statusCode)
        .toBe(500)
})


