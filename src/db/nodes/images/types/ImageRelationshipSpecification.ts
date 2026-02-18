import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const ImageRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.ImageBelongsToNode, {
        startNodeLabel: NodeTypeLabel.Image,
        endNodeLabel: NodeTypeLabel.Node,
        relationshipName: RelationshipTypeNeo4j.ImageBelongsToNode,
        isReverseRelationship: true,
    }],
    [DbRelationship.ImageIsPrimeImageOfNode, {
        startNodeLabel: NodeTypeLabel.Image,
        endNodeLabel: NodeTypeLabel.Node,
        relationshipName: RelationshipTypeNeo4j.ImageIsPrimeImageOfNode,
        isReverseRelationship: false,
    }],
]
