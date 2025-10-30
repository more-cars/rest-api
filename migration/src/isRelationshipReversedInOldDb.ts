import {DbRelationship} from "../../src/db/types/DbRelationship"

export function isRelationshipReversedInOldDb(newRelationshipType: DbRelationship) {
    return [
        DbRelationship.CarModelHasSuccessor,
        DbRelationship.CarModelVariantAchievedLapTime,
        DbRelationship.CarModelVariantAchievedSessionResult,
        DbRelationship.TrackLayoutHasLapTime,
        DbRelationship.RacingEventIsFollowedByEvent,
        DbRelationship.SessionResultHasLapTime,
        DbRelationship.NodeHasPrimeImage,
    ].includes(newRelationshipType)
}
