---
inject: true
to: src/models/node-types/convertDbNodeToModelNode.ts
before: "convertImageDbNodeToModelNode"
skip_if: "import {convert<%= h.changeCase.pascal(nodeType) %>DbNodeToModelNode} from"
---
import {convert<%= h.changeCase.pascal(nodeType) %>DbNodeToModelNode} from "./<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/convert<%= h.changeCase.pascal(nodeType) %>DbNodeToModelNode"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"