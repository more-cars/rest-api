import {NodeTypeLabel} from "../NodeTypeLabel"
import {DbRelationship} from "./DbRelationship"
import {DbRelationshipName} from "./DbRelationshipName"

export type RelationshipSpecification = [
    DbRelationship, {
        startNodeLabel: NodeTypeLabel
        endNodeLabel: NodeTypeLabel
        relationshipName: DbRelationshipName
        isReverseRelationship: boolean
    }
]
