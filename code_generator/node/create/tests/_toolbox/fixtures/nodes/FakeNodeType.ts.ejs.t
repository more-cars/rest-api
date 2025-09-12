---
to: tests/_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>.ts
---
import {faker} from "@faker-js/faker"

export default {
<% for (prop in properties) { -%>
<%    if (properties[prop].datatype === 'string') { -%>
    <%= prop %>: faker.word.noun(),
<%    } else if (properties[prop].datatype === 'number') { -%>
    <%= prop %>: faker.number.int({min: 1000, max: 3000}),
<%    } else if (properties[prop].datatype === 'boolean') { -%>
    <%= prop %>: faker.datatype.boolean(),
<%    } -%>
<% } -%>
}
