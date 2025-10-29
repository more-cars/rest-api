---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/validating-user-input.test.ts
---
import {describe, expect, test} from 'vitest'
import {Create<%= h.changeCase.pascal(nodeType) %>RawInput} from "../../../../../src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Create<%= h.changeCase.pascal(nodeType) %>RawInput"
import {validate} from "../../../../../src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create"

describe('Validating user input', () => {
    test('mandatory fields are missing', async () => {
        const data: Create<%= h.changeCase.pascal(nodeType) %>RawInput = {
<% for (prop in properties) { %>
<%   if (properties[prop].mandatory) { %>
            <%= prop %>: undefined,
<%   } else if (properties[prop].datatype === 'string') { %>
            <%= prop %>: "<%= properties[prop].example %>",
<%   } else { %>
            <%= prop %>: <%= properties[prop].example %>,
<%   } %>
<% } -%>
        }

        const result = validate(data)

        expect(result)
            .toBeFalsy()
    })

    test('optional fields are missing', async () => {
        const data: Create<%= h.changeCase.pascal(nodeType) %>RawInput = {
<% for (prop in properties) { %>
<%   if (!properties[prop].mandatory) { %>
            <%= prop %>: undefined,
<%   } else if (properties[prop].datatype === 'string') { %>
            <%= prop %>: "<%= properties[prop].example %>",
<%   } else { %>
            <%= prop %>: <%= properties[prop].example %>,
<%   } %>
<% } -%>
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })

    test('providing valid input', async () => {
        const data: Create<%= h.changeCase.pascal(nodeType) %>RawInput = {
<% for (prop in properties) { %>
<%   if (properties[prop].datatype === 'string') { %>
            <%= prop %>: "<%= properties[prop].example %>",
<%   } else { %>
            <%= prop %>: <%= properties[prop].example %>,
<%   } %>
<% } -%>
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })
})
