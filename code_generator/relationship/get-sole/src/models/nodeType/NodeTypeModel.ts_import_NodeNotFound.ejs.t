---
inject: true
to: src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
after: from "./create<%= h.changeCase.pascal(relationshipName) %>Relationship"
skip_if: "../types/NodeNotFoundError"
---
import {NodeNotFoundError} from "../types/NodeNotFoundError"