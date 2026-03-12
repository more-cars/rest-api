import {Neo4jNodeType} from "../types/Neo4jNodeType"
import {RelationshipDirection} from "../types/RelationshipDirection"
import {RelationshipTypeNeo4j} from "../types/RelationshipTypeNeo4j"
import {RelationshipType} from "../types/RelationshipType"
import {RelationshipTypeNotFoundError} from "../types/RelationshipTypeNotFoundError"

export function mapNeo4jRelationshipTypeToDbRelationshipType(
    startNodeLabel: Neo4jNodeType,
    relationshipDirection: RelationshipDirection,
    neo4jRelationshipType: RelationshipTypeNeo4j,
): RelationshipType {
    const mapping = new Map<Neo4jNodeType, Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>>([
        [Neo4jNodeType.Company, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Company - Reverse
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Company - Forward
                [RelationshipTypeNeo4j.CompanyHasBrand, RelationshipType.CompanyHasBrand],
                [RelationshipTypeNeo4j.CompanyHasImage, RelationshipType.CompanyHasImage],
                [RelationshipTypeNeo4j.CompanyHasPrimeImage, RelationshipType.CompanyHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.Brand, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Brand - Reverse
                [RelationshipTypeNeo4j.BrandBelongsToCompany, RelationshipType.BrandBelongsToCompany],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Brand - Forward
                [RelationshipTypeNeo4j.BrandHasCarModel, RelationshipType.BrandHasCarModel],
                [RelationshipTypeNeo4j.BrandHasImage, RelationshipType.BrandHasImage],
                [RelationshipTypeNeo4j.BrandHasPrimeImage, RelationshipType.BrandHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.CarModel, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Car Model - Reverse
                [RelationshipTypeNeo4j.CarModelBelongsToBrand, RelationshipType.CarModelBelongsToBrand],
                [RelationshipTypeNeo4j.CarModelIsSuccessorOf, RelationshipType.CarModelIsSuccessorOf],
                [RelationshipTypeNeo4j.CarModelCoveredByMagazineIssue, RelationshipType.CarModelCoveredByMagazineIssue],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Car Model - Forward
                [RelationshipTypeNeo4j.CarModelHasSuccessor, RelationshipType.CarModelHasSuccessor],
                [RelationshipTypeNeo4j.CarModelHasVariant, RelationshipType.CarModelHasVariant],
                [RelationshipTypeNeo4j.CarModelHasImage, RelationshipType.CarModelHasImage],
                [RelationshipTypeNeo4j.CarModelHasPrimeImage, RelationshipType.CarModelHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.CarModelVariant, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Car Model Variant - Reverse
                [RelationshipTypeNeo4j.CarModelVariantIsVariantOf, RelationshipType.CarModelVariantIsVariantOf],
                [RelationshipTypeNeo4j.CarModelVariantIsPresentedInMagazineIssue, RelationshipType.CarModelVariantIsPresentedInMagazineIssue],
                [RelationshipTypeNeo4j.CarModelVariantReviewedByMagazineIssueWithRating, RelationshipType.CarModelVariantReviewedByMagazineIssueWithRating],
                [RelationshipTypeNeo4j.CarModelVariantIsFeaturedInRacingGame, RelationshipType.CarModelVariantIsFeaturedInRacingGame],
                [RelationshipTypeNeo4j.CarModelVariantPresentedAtMotorShow, RelationshipType.CarModelVariantPresentedAtMotorShow],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Car Model Variant - Forward
                [RelationshipTypeNeo4j.CarModelVariantAchievedSessionResult, RelationshipType.CarModelVariantAchievedSessionResult],
                [RelationshipTypeNeo4j.CarModelVariantAchievedLapTime, RelationshipType.CarModelVariantAchievedLapTime],
                [RelationshipTypeNeo4j.CarModelVariantHasImage, RelationshipType.CarModelVariantHasImage],
                [RelationshipTypeNeo4j.CarModelVariantHasPrimeImage, RelationshipType.CarModelVariantHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.RaceTrack, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Race Track - Reverse
                [RelationshipTypeNeo4j.RaceTrackHostedRacingEvent, RelationshipType.RaceTrackHostedRacingEvent],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Race Track - Forward
                [RelationshipTypeNeo4j.RaceTrackHasLayout, RelationshipType.RaceTrackHasLayout],
                [RelationshipTypeNeo4j.RaceTrackHasImage, RelationshipType.RaceTrackHasImage],
                [RelationshipTypeNeo4j.RaceTrackHasPrimeImage, RelationshipType.RaceTrackHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.TrackLayout, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Track Layout - Reverse
                [RelationshipTypeNeo4j.TrackLayoutBelongsToRaceTrack, RelationshipType.TrackLayoutBelongsToRaceTrack],
                [RelationshipTypeNeo4j.TrackLayoutWasUsedByRacingEvent, RelationshipType.TrackLayoutWasUsedByRacingEvent],
                [RelationshipTypeNeo4j.TrackLayoutIsFeaturedInRacingGame, RelationshipType.TrackLayoutIsFeaturedInRacingGame],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Track Layout - Forward
                [RelationshipTypeNeo4j.TrackLayoutHasLapTime, RelationshipType.TrackLayoutHasLapTime],
                [RelationshipTypeNeo4j.TrackLayoutHasImage, RelationshipType.TrackLayoutHasImage],
                [RelationshipTypeNeo4j.TrackLayoutHasPrimeImage, RelationshipType.TrackLayoutHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.RacingSeries, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Racing Series - Reverse
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Racing Series - Forward
                [RelationshipTypeNeo4j.RacingSeriesHasRacingEvent, RelationshipType.RacingSeriesHasRacingEvent],
                [RelationshipTypeNeo4j.RacingSeriesHasImage, RelationshipType.RacingSeriesHasImage],
                [RelationshipTypeNeo4j.RacingSeriesHasPrimeImage, RelationshipType.RacingSeriesHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.RacingEvent, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Racing Event - Reverse
                [RelationshipTypeNeo4j.RacingEventBelongsToRacingSeries, RelationshipType.RacingEventBelongsToRacingSeries],
                [RelationshipTypeNeo4j.RacingEventFollowsEvent, RelationshipType.RacingEventFollowsEvent],
                [RelationshipTypeNeo4j.RacingEventCoveredByMagazineIssue, RelationshipType.RacingEventCoveredByMagazineIssue],

            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Racing Event - Forward
                [RelationshipTypeNeo4j.RacingEventIsFollowedByEvent, RelationshipType.RacingEventIsFollowedByEvent],
                [RelationshipTypeNeo4j.RacingEventTookPlaceAtRaceTrack, RelationshipType.RacingEventTookPlaceAtRaceTrack],
                [RelationshipTypeNeo4j.RacingEventUsedTheTrackLayout, RelationshipType.RacingEventUsedTheTrackLayout],
                [RelationshipTypeNeo4j.RacingEventHasRacingSession, RelationshipType.RacingEventHasRacingSession],
                [RelationshipTypeNeo4j.RacingEventHasImage, RelationshipType.RacingEventHasImage],
                [RelationshipTypeNeo4j.RacingEventHasPrimeImage, RelationshipType.RacingEventHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.RacingSession, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Racing Session - Reverse
                [RelationshipTypeNeo4j.RacingSessionBelongsToRacingEvent, RelationshipType.RacingSessionBelongsToRacingEvent],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Racing Session - Forward
                [RelationshipTypeNeo4j.RacingSessionHasSessionResult, RelationshipType.RacingSessionHasSessionResult],
                [RelationshipTypeNeo4j.RacingSessionHasImage, RelationshipType.RacingSessionHasImage],
                [RelationshipTypeNeo4j.RacingSessionHasPrimeImage, RelationshipType.RacingSessionHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.SessionResult, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Session Result - Reverse
                [RelationshipTypeNeo4j.SessionResultBelongsToRacingSession, RelationshipType.SessionResultBelongsToRacingSession],
                [RelationshipTypeNeo4j.SessionResultAchievedWithCarModelVariant, RelationshipType.SessionResultAchievedWithCarModelVariant],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Session Result - Forward
                [RelationshipTypeNeo4j.SessionResultHasLapTime, RelationshipType.SessionResultHasLapTime],
                [RelationshipTypeNeo4j.SessionResultHasImage, RelationshipType.SessionResultHasImage],
                [RelationshipTypeNeo4j.SessionResultHasPrimeImage, RelationshipType.SessionResultHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.LapTime, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Lap Time - Reverse
                [RelationshipTypeNeo4j.LapTimeBelongsToSessionResult, RelationshipType.LapTimeBelongsToSessionResult],
                [RelationshipTypeNeo4j.LapTimeAchievedOnTrackLayout, RelationshipType.LapTimeAchievedOnTrackLayout],
                [RelationshipTypeNeo4j.LapTimeAchievedWithCarModelVariant, RelationshipType.LapTimeAchievedWithCarModelVariant],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Lap Time - Forward
                [RelationshipTypeNeo4j.LapTimeHasImage, RelationshipType.LapTimeHasImage],
                [RelationshipTypeNeo4j.LapTimeHasPrimeImage, RelationshipType.LapTimeHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.RacingGame, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Racing Game - Reverse
                [RelationshipTypeNeo4j.RacingGameReleasedOnGamingPlatform, RelationshipType.RacingGameReleasedOnGamingPlatform],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Racing Game - Forward
                [RelationshipTypeNeo4j.RacingGameFeaturesCarModelVariant, RelationshipType.RacingGameFeaturesCarModelVariant],
                [RelationshipTypeNeo4j.RacingGameFeaturesTrackLayout, RelationshipType.RacingGameFeaturesTrackLayout],
                [RelationshipTypeNeo4j.RacingGameHasImage, RelationshipType.RacingGameHasImage],
                [RelationshipTypeNeo4j.RacingGameHasPrimeImage, RelationshipType.RacingGameHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.GamingPlatform, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Gaming Platform - Reverse
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Gaming Platform - Forward
                [RelationshipTypeNeo4j.GamingPlatformFeaturesRacingGame, RelationshipType.GamingPlatformFeaturesRacingGame],
                [RelationshipTypeNeo4j.GamingPlatformHasImage, RelationshipType.GamingPlatformHasImage],
                [RelationshipTypeNeo4j.GamingPlatformHasPrimeImage, RelationshipType.GamingPlatformHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.Magazine, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Magazine - Reverse
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Magazine - Forward
                [RelationshipTypeNeo4j.MagazineHasIssue, RelationshipType.MagazineHasIssue],
                [RelationshipTypeNeo4j.MagazineHasImage, RelationshipType.MagazineHasImage],
                [RelationshipTypeNeo4j.MagazineHasPrimeImage, RelationshipType.MagazineHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.MagazineIssue, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Magazine Issue - Reverse
                [RelationshipTypeNeo4j.MagazineIssueBelongsToMagazine, RelationshipType.MagazineIssueBelongsToMagazine],
                [RelationshipTypeNeo4j.MagazineIssueFollowsIssue, RelationshipType.MagazineIssueFollowsIssue],
                [RelationshipTypeNeo4j.MagazineIssueReviewedCarModelVariantWithRating, RelationshipType.MagazineIssueReviewedCarModelVariantWithRating],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Magazine Issue - Forward
                [RelationshipTypeNeo4j.MagazineIssueFollowedByIssue, RelationshipType.MagazineIssueFollowedByIssue],
                [RelationshipTypeNeo4j.MagazineIssueCoversCarModel, RelationshipType.MagazineIssueCoversCarModel],
                [RelationshipTypeNeo4j.MagazineIssuePresentsCarModelVariant, RelationshipType.MagazineIssuePresentsCarModelVariant],
                [RelationshipTypeNeo4j.MagazineIssueCoversRacingEvent, RelationshipType.MagazineIssueCoversRacingEvent],
                [RelationshipTypeNeo4j.MagazineIssueHasImage, RelationshipType.MagazineIssueHasImage],
                [RelationshipTypeNeo4j.MagazineIssueHasPrimeImage, RelationshipType.MagazineIssueHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.Rating, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Rating - Reverse
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Rating - Forward
                [RelationshipTypeNeo4j.RatingByMagazineIssue, RelationshipType.RatingByMagazineIssue],
                [RelationshipTypeNeo4j.RatingForCarModelVariant, RelationshipType.RatingForCarModelVariant],
                [RelationshipTypeNeo4j.RatingHasImage, RelationshipType.RatingHasImage],
                [RelationshipTypeNeo4j.RatingHasPrimeImage, RelationshipType.RatingHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.Programme, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Programme - Reverse
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Programme - Forward
                [RelationshipTypeNeo4j.ProgrammeHasEpisode, RelationshipType.ProgrammeHasEpisode],
                [RelationshipTypeNeo4j.ProgrammeHasImage, RelationshipType.ProgrammeHasImage],
            ])],
        ])],
        [Neo4jNodeType.ProgrammeEpisode, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Programme Episode - Reverse
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Programme Episode - Forward
            ])],
        ])],
        [Neo4jNodeType.MotorShow, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Motor Show - Reverse
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Motor Show - Forward
                [RelationshipTypeNeo4j.MotorShowPresentsCarModelVariant, RelationshipType.MotorShowPresentsCarModelVariant],
                [RelationshipTypeNeo4j.MotorShowHasImage, RelationshipType.MotorShowHasImage],
                [RelationshipTypeNeo4j.MotorShowHasPrimeImage, RelationshipType.MotorShowHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.Image, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Image - Reverse
                [RelationshipTypeNeo4j.ImageBelongsToNode, RelationshipType.ImageBelongsToNode],
                [RelationshipTypeNeo4j.ImageIsPrimeImageOfNode, RelationshipType.ImageIsPrimeImageOfNode],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Image - Forward
            ])],
        ])],
    ])

    const dbRelationshipType = mapping.get(startNodeLabel)?.get(relationshipDirection)?.get(neo4jRelationshipType)

    if (!dbRelationshipType) {
        throw new RelationshipTypeNotFoundError(neo4jRelationshipType)
    }

    return dbRelationshipType
}
