---
to: src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/convert<%= h.changeCase.pascal(nodeType) %>Neo4jNodeToDbNode.ts
---
import {Node} from "neo4j-driver"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"
import {DbNodeType} from "../../types/DbNodeType"

export function convert<%= h.changeCase.pascal(nodeType) %>Neo4jNodeToDbNode(neo4jNode: Node): <%= h.changeCase.pascal(nodeType) %>Node {
    return {
        node_type: DbNodeType.<%= h.changeCase.pascal(nodeType) %>,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,
    
            // user data
<% for (prop in properties) { -%>
            <%= prop %>: neo4jNode.properties.<%= prop -%>,
<% } -%>
        },
    } satisfies <%= h.changeCase.pascal(nodeType) %>Node
}
