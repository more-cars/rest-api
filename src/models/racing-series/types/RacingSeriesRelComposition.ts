import {RelationshipType} from "../../relationships/types/RelationshipType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const RacingSeriesRelComposition: RelComposition[] = [
    [RelationshipType.RacingSeriesHasRacingEvent, {
        startNodeType: NodeType.RACING_SERIES,
        endNodeType: NodeType.RACING_EVENT,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSeriesHasImage, {
        startNodeType: NodeType.RACING_SERIES,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSeriesHasPrimeImage, {
        startNodeType: NodeType.RACING_SERIES,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
