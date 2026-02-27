import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../../db/types/RelationshipType"
import {DbNodeType} from "../../db/types/DbNodeType"

export const RacingSeriesRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.RacingSeriesHasRacingEvent, {
        startNodeType: DbNodeType.RacingSeries,
        endNodeType: DbNodeType.RacingEvent,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSeriesHasImage, {
        startNodeType: DbNodeType.RacingSeries,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSeriesHasPrimeImage, {
        startNodeType: DbNodeType.RacingSeries,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
]
