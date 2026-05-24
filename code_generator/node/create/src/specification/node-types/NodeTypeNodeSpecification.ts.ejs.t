---
to: src/specification/node-types/<%= h.changeCase.pascal(nodeType) %>NodeSpecification.ts
---
<% const properties = JSON.parse(props) -%>
import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const <%= h.changeCase.pascal(nodeType) %>NodeSpecification: NodeSpecification = {
    type: NodeType.<%= h.changeCase.pascal(nodeType) %>,
    properties: [
<% properties.forEach(prop => { -%>
        {
            name: '<%- prop.name -%>',
            datatype: '<%- prop.datatype -%>',
            mandatory: <%- prop.mandatory -%>,
            example: <%- prop.datatype === 'string' ? `"${prop.example}"` : prop.example -%>,
            scope: '<%- prop.scope || "user" -%>',
            validation: [], // TODO enter validation rules
        },
<% }) -%>
    ],
}
