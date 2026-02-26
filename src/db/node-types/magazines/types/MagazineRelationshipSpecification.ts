import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"

export const MagazineRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.MagazineHasImage, {
        startNodeType: DbNodeType.Magazine,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    //
]
