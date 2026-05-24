---
to: tests/_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>.ts
---
<% const properties = JSON.parse(props) -%>
import {faker} from "@faker-js/faker"
import type {DbInputData} from "../../../../src/db/types/DbInputData"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"

export const Fake<%= h.changeCase.pascal(nodeType) %> = {
    dbInput: function () {
        return {
<% properties.forEach(prop => { -%>
<%    if (prop.datatype === 'string') { -%>
            <%= prop.name %>: faker.word.noun(),
<%    } else if (prop.datatype === 'number') { -%>
            <%= prop.name %>: faker.number.int({min: 1000, max: 3000}),
<%    } else if (prop.datatype === 'boolean') { -%>
            <%= prop.name %>: faker.datatype.boolean(),
<%    } -%>
<% }) -%>
        } satisfies DbInputData
    },

    dbInputMinimal: function () {
        return {
<% properties.forEach(prop => { -%>
<%    if (prop.mandatory) { -%>
<%      if (prop.datatype === 'string') { -%>
            <%= prop.name %>: faker.word.noun(),
<%      } else if (prop.datatype === 'number') { -%>
            <%= prop.name %>: faker.number.int({min: 1000, max: 3000}),
<%      } else if (prop.datatype === 'boolean') { -%>
            <%= prop.name %>: faker.datatype.boolean(),
<%      } -%>
<%    } -%>
<% }) -%>
        } as DbInputData
    },

    modelOutput: function () {
        return {
            node_type: ModelNodeType.<%= h.changeCase.pascal(nodeType) %>,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
<% properties.forEach(prop => { -%>
<%    if (prop.datatype === 'string') { -%>
                <%= prop.name %>: faker.word.noun(),
<%    } else if (prop.datatype === 'number') { -%>
                <%= prop.name %>: faker.number.int({min: 1000, max: 3000}),
<%    } else if (prop.datatype === 'boolean') { -%>
                <%= prop.name %>: faker.datatype.boolean(),
<%    } -%>
<% }) -%>
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            },
        } satisfies <%= h.changeCase.pascal(nodeType) %>Node
    },
}
