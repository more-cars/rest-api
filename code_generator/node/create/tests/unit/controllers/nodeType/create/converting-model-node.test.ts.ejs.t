---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/converting-model-node.test.ts
---
<%
    let props = []
    for (prop in properties) {
        if (properties[prop].datatype === 'string' && properties[prop].example) {
            props.push(prop + ': "' + properties[prop].example + '"')
        } else if (!properties[prop].example) {
            props.push(prop + ': null')
        } else {
            props.push(prop + ': ' + properties[prop].example)
        }
    }
-%>
import {expect, test} from 'vitest'
import {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode} from "../../../../../src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../src/controllers/types/ControllerNodeType"

test("converting a <%= h.changeCase.upper(nodeType) %> node", async () => {
    const node: <%= h.changeCase.pascal(nodeType) %>Node = {
        node_type: ModelNodeType.<%= h.changeCase.pascal(nodeType) %>,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
<%- props.map(line => '            ' + line).join(',\n') %>,
        },
    }

    const convertedNode = convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.<%= h.changeCase.pascal(nodeType) %>,
            fields: {
                id: 1,
<%- props.map(line => '                ' + line).join(',\n') %>,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            },
        })
})
