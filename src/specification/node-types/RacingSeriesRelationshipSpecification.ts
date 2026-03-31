import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const RacingSeriesRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.RacingSeriesHasRacingEvent, {
        startNodeType: NodeType.RacingSeries,
        endNodeType: NodeType.RacingEvent,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSeriesHasImage, {
        startNodeType: NodeType.RacingSeries,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSeriesHasPrimeImage, {
        startNodeType: NodeType.RacingSeries,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSeriesHasVideo, {
        startNodeType: NodeType.RacingSeries,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSeriesHasMainVideo, {
        startNodeType: NodeType.RacingSeries,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    //
]
