import {RelationshipType} from "../../src/db/types/RelationshipType"

export function isRelationshipReversedInOldDb(newRelationshipType: RelationshipType) {
    return [
        RelationshipType.CarModelHasSuccessor,
        RelationshipType.CarModelVariantAchievedLapTime,
        RelationshipType.CarModelVariantAchievedSessionResult,
        RelationshipType.CarModelVariantHasScaleModel,
        RelationshipType.TrackLayoutHasLapTime,
        RelationshipType.RacingEventIsFollowedByEvent,
        RelationshipType.SessionResultHasLapTime,
        RelationshipType.MagazineIssueFollowedByIssue,
        RelationshipType.RatingForCarModelVariant,
        RelationshipType.RatingByMagazineIssue,
        RelationshipType.ProgrammeEpisodeIsFollowedByEpisode,
        RelationshipType.NodeHasPrimeImage,
    ].includes(newRelationshipType)
}
