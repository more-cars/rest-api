import {RelComposition} from "../../../relationships/types/RelComposition"
import {RelType} from "../../../relationships/types/RelType"
import {ModelNodeType} from "../../../types/ModelNodeType"

export const SessionResultRelComposition: RelComposition[] = [
    [RelType.SessionResultBelongsToRacingSession, {
        startNodeType: ModelNodeType.SessionResult,
        endNodeType: ModelNodeType.RacingSession,
        isReverseRelationship: true,
    }],
    [RelType.SessionResultHasLapTime, {
        startNodeType: ModelNodeType.SessionResult,
        endNodeType: ModelNodeType.LapTime,
        isReverseRelationship: false,
    }],
    [RelType.SessionResultAchievedWithCarModelVariant, {
        startNodeType: ModelNodeType.SessionResult,
        endNodeType: ModelNodeType.CarModelVariant,
        isReverseRelationship: true,
    }],
    [RelType.SessionResultHasImage, {
        startNodeType: ModelNodeType.SessionResult,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelType.SessionResultHasPrimeImage, {
        startNodeType: ModelNodeType.SessionResult,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
]
