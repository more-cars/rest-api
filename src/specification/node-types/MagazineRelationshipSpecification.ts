import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const MagazineRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.MagazineHasImage, {
        startNodeType: NodeType.Magazine,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    //
]
