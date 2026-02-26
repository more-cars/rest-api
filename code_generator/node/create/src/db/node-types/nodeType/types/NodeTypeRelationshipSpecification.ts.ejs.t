---
to: src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>RelationshipSpecification.ts
---
import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"

export const <%= h.changeCase.pascal(nodeType) %>RelationshipSpecification: RelationshipSpecification[] = [
    //
]
