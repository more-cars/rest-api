import {RelComposition} from "../../../relationships/types/RelComposition"
import {RelType} from "../../../relationships/types/RelType"
import {ModelNodeType} from "../../../types/ModelNodeType"

export const RacingSessionRelComposition: RelComposition[] = [
    [RelType.RacingSessionBelongsToRacingEvent, {
        startNodeType: ModelNodeType.RacingSession,
        endNodeType: ModelNodeType.RacingEvent,
        isReverseRelationship: true,
    }],
    [RelType.RacingSessionHasSessionResult, {
        startNodeType: ModelNodeType.RacingSession,
        endNodeType: ModelNodeType.SessionResult,
        isReverseRelationship: false,
    }],
    [RelType.RacingSessionHasImage, {
        startNodeType: ModelNodeType.RacingSession,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelType.RacingSessionHasPrimeImage, {
        startNodeType: ModelNodeType.RacingSession,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
]
