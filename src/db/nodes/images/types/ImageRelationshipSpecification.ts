import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {DbRelationshipName} from "../../../types/DbRelationshipName"

export const ImageRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.ImageBelongsToNode, {
        startNodeLabel: NodeTypeLabel.Image,
        endNodeLabel: NodeTypeLabel.Node,
        relationshipName: DbRelationshipName.ImageBelongsToNode,
        isReverseRelationship: true,
    }],
    [DbRelationship.ImageIsPrimeImageOfNode, {
        startNodeLabel: NodeTypeLabel.Image,
        endNodeLabel: NodeTypeLabel.Node,
        relationshipName: DbRelationshipName.ImageIsPrimeImageOfNode,
        isReverseRelationship: false,
    }],
]
