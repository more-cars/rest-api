import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const ImageRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.ImageBelongsToNode, {
        startNodeLabel: NodeTypeLabel.Image,
        endNodeLabel: NodeTypeLabel.Node,
        relationshipName: RelationshipTypeNeo4j.ImageBelongsToNode,
        isReverseRelationship: true,
    }],
    [RelationshipType.ImageIsPrimeImageOfNode, {
        startNodeLabel: NodeTypeLabel.Image,
        endNodeLabel: NodeTypeLabel.Node,
        relationshipName: RelationshipTypeNeo4j.ImageIsPrimeImageOfNode,
        isReverseRelationship: false,
    }],
]
