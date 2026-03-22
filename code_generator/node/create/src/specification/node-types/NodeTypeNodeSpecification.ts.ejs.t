---
to: src/specification/node-types/<%= h.changeCase.pascal(nodeType) %>NodeSpecification.ts
---
import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const <%= h.changeCase.pascal(nodeType) %>NodeSpecification: NodeSpecification = {
    type: NodeType.<%= h.changeCase.pascal(nodeType) %>,
    properties: [
<% for (prop in properties) { -%>
        {
            name: '<%= prop -%>',
            datatype: '<%= properties[prop].datatype -%>',
            mandatory: <%= properties[prop].mandatory -%>,
        },
<% } -%>
    ],
}
