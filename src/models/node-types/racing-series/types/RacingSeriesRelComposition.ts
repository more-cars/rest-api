import {RelType} from "../../../relationships/types/RelType"
import {NodeType} from "../../../types/NodeType"
import {RelComposition} from "../../../relationships/types/RelComposition"

export const RacingSeriesRelComposition: RelComposition[] = [
    [RelType.RacingSeriesHasRacingEvent, {
        startNodeType: NodeType.RACING_SERIES,
        endNodeType: NodeType.RACING_EVENT,
        isReverseRelationship: false,
    }],
    [RelType.RacingSeriesHasImage, {
        startNodeType: NodeType.RACING_SERIES,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelType.RacingSeriesHasPrimeImage, {
        startNodeType: NodeType.RACING_SERIES,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
