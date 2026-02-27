---
to: src/specification/node-types/<%= h.changeCase.pascal(nodeType) %>RelationshipSpecification.ts
---
import {RelationshipSpecification} from "../../db/types/RelationshipSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const <%= h.changeCase.pascal(nodeType) %>RelationshipSpecification: RelationshipSpecification[] = [
    //
]
