---
to: tests/_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>.ts
---
import {faker} from "@faker-js/faker"
import type {Input<%= h.changeCase.pascal(nodeType) %>Create} from "../../../../src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Input<%= h.changeCase.pascal(nodeType) %>Create"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"

export const Fake<%= h.changeCase.pascal(nodeType) %> = {
    dbInput: {
<% for (prop in properties) { -%>
<%    if (properties[prop].datatype === 'string') { -%>
        <%= prop %>: faker.word.noun(),
<%    } else if (properties[prop].datatype === 'number') { -%>
        <%= prop %>: faker.number.int({min: 1000, max: 3000}),
<%    } else if (properties[prop].datatype === 'boolean') { -%>
        <%= prop %>: faker.datatype.boolean(),
<%    } -%>
<% } -%>
    } as Input<%= h.changeCase.pascal(nodeType) %>Create,

    dbInputMinimal: {
<% for (prop in properties) { -%>
<%    if (properties[prop].mandatory) { -%>
<%      if (properties[prop].datatype === 'string') { -%>
        <%= prop %>: faker.word.noun(),
<%      } else if (properties[prop].datatype === 'number') { -%>
        <%= prop %>: faker.number.int({min: 1000, max: 3000}),
<%      } else if (properties[prop].datatype === 'boolean') { -%>
        <%= prop %>: faker.datatype.boolean(),
<%      } -%>
<%    } -%>
<% } -%>
    } as Input<%= h.changeCase.pascal(nodeType) %>Create,

    modelOutput: {
        node_type: ModelNodeType.<%= h.changeCase.pascal(nodeType) %>,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
<% for (prop in properties) { -%>
<%    if (properties[prop].datatype === 'string') { -%>
            <%= prop %>: faker.word.noun(),
<%    } else if (properties[prop].datatype === 'number') { -%>
            <%= prop %>: faker.number.int({min: 1000, max: 3000}),
<%    } else if (properties[prop].datatype === 'boolean') { -%>
            <%= prop %>: faker.datatype.boolean(),
<%    } -%>
<% } -%>
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies <%= h.changeCase.pascal(nodeType) %>Node
}
