---
to: src/specification/node-types/<%= h.changeCase.pascal(nodeType) %>RelationshipSpecification.ts
---
import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const <%= h.changeCase.pascal(nodeType) %>RelationshipSpecification: RelationshipTypeSpecification[] = [
    //
]
