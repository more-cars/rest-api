import {RelationshipType} from "../../src/db/types/RelationshipType"

export function isRelationshipReversedInOldDb(newRelationshipType: RelationshipType) {
    return [
        RelationshipType.CarModelHasSuccessor,
        RelationshipType.CarModelVariantAchievedLapTime,
        RelationshipType.CarModelVariantAchievedSessionResult,
        RelationshipType.TrackLayoutHasLapTime,
        RelationshipType.RacingEventIsFollowedByEvent,
        RelationshipType.SessionResultHasLapTime,
        RelationshipType.NodeHasPrimeImage,
    ].includes(newRelationshipType)
}
