---
to: src/specification/node-types/<%= h.changeCase.pascal(nodeType) %>RelationshipSpecification.ts
---
import {RelationshipSpecification} from "../../db/types/RelationshipSpecification"
import {RelationshipType} from "../RelationshipType"
import {DbNodeType} from "../../db/types/DbNodeType"

export const <%= h.changeCase.pascal(nodeType) %>RelationshipSpecification: RelationshipSpecification[] = [
    //
]
