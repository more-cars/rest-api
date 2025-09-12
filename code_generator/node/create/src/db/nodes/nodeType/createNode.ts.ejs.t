---
to: src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/createNode.ts
---
import {Input<%= h.changeCase.pascal(nodeType) %>Create} from "./types/Input<%= h.changeCase.pascal(nodeType) %>Create"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node} from "./mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: Input<%= h.changeCase.pascal(nodeType) %>Create): Promise<<%= h.changeCase.pascal(nodeType) %>Node> {
    const node = await createDbNode(NodeTypeLabel.<%= h.changeCase.pascal(nodeType) %>, createNodeQuery(data))

    return mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node(node)
}

export function createNodeQuery(data: Input<%= h.changeCase.pascal(nodeType) %>Create) {
    let template = getCypherQueryTemplate('nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/_cypher/createNode.cypher')
        .trim()

    template = template
<% for (prop in properties) { -%>
<%   if (properties[prop].mandatory && properties[prop].datatype === 'string') { -%>
        .replace('$<%= prop -%>', `'${escapeSingleQuotes(data.<%= prop -%>)}'`)
<%   } else if (properties[prop].mandatory) { -%>
        .replace('$<%= prop -%>', `${data.<%= prop -%>}`)
<%   } else if (properties[prop].datatype === 'string') { -%>
        .replace('$<%= prop -%>', data.<%= prop -%> ? `'${escapeSingleQuotes(data.<%= prop -%>)}'` : 'null')
<%   } else { -%>
        .replace('$<%= prop -%>', data.<%= prop -%> ? `${data.<%= prop -%>}` : 'null')
<%   } -%>
<% } -%>
    return template
}
