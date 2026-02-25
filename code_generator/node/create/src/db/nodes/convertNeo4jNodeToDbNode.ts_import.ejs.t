---
inject: true
to: src/db/nodes/convertNeo4jNodeToDbNode.ts
before: convertImageNeo4jNodeToDbNode
skip_if: import {convert<%= h.changeCase.pascal(nodeType) %>Neo4jNodeToDbNode} from
---
import {convert<%= h.changeCase.pascal(nodeType) %>Neo4jNodeToDbNode} from "../node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/convert<%= h.changeCase.pascal(nodeType) %>Neo4jNodeToDbNode"