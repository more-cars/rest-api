import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"

export const RacingSeriesRelationshipSpecification: RelationshipSpecification[] = [
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
