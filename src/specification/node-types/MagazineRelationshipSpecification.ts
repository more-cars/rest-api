import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {DbNodeType} from "../../db/types/DbNodeType"

export const MagazineRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.MagazineHasImage, {
        startNodeType: DbNodeType.Magazine,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    //
]
