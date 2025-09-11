---
to: src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node.ts
---
import {Node} from "neo4j-driver"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"

export function mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node(dbNode: Node): <%= h.changeCase.pascal(nodeType) %>Node {
    return {
        // system data
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,

        // user data
<% for (prop in properties) { -%>
        <%= prop %>: dbNode.properties.<%= prop -%>,
<% } -%>
    } as <%= h.changeCase.pascal(nodeType) %>Node
}
