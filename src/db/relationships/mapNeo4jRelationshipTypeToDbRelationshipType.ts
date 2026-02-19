import {RelationshipTypeNeo4j} from "../types/RelationshipTypeNeo4j"
import {RelationshipType} from "../types/RelationshipType"
import {NodeTypeLabel} from "../NodeTypeLabel"
import {RelationshipTypeNotFoundError} from "../types/RelationshipTypeNotFoundError"

export function mapNeo4jRelationshipTypeToDbRelationshipType(neo4jRelationshipType: RelationshipTypeNeo4j, startNodeLabel: NodeTypeLabel): RelationshipType {
    const mapping = new Map<NodeTypeLabel, Map<RelationshipTypeNeo4j, RelationshipType>>([
        [NodeTypeLabel.Company, new Map([
            [RelationshipTypeNeo4j.CompanyHasBrand, RelationshipType.CompanyHasBrand],
            [RelationshipTypeNeo4j.CompanyHasImage, RelationshipType.CompanyHasImage],
            [RelationshipTypeNeo4j.CompanyHasPrimeImage, RelationshipType.CompanyHasPrimeImage],
        ])],
        [NodeTypeLabel.Brand, new Map([
            [RelationshipTypeNeo4j.BrandBelongsToCompany, RelationshipType.BrandBelongsToCompany],
            [RelationshipTypeNeo4j.BrandHasCarModel, RelationshipType.BrandHasCarModel],
            [RelationshipTypeNeo4j.BrandHasImage, RelationshipType.BrandHasImage],
            [RelationshipTypeNeo4j.BrandHasPrimeImage, RelationshipType.BrandHasPrimeImage],
        ])],
        [NodeTypeLabel.CarModel, new Map([
            [RelationshipTypeNeo4j.CarModelBelongsToBrand, RelationshipType.CarModelBelongsToBrand],
            [RelationshipTypeNeo4j.CarModelHasSuccessor, RelationshipType.CarModelHasSuccessor],
            [RelationshipTypeNeo4j.CarModelIsSuccessorOf, RelationshipType.CarModelIsSuccessorOf],
            [RelationshipTypeNeo4j.CarModelHasVariant, RelationshipType.CarModelHasVariant],
            [RelationshipTypeNeo4j.CarModelHasImage, RelationshipType.CarModelHasImage],
            [RelationshipTypeNeo4j.CarModelHasPrimeImage, RelationshipType.CarModelHasPrimeImage],
        ])],
        [NodeTypeLabel.CarModelVariant, new Map([
            [RelationshipTypeNeo4j.CarModelVariantIsVariantOf, RelationshipType.CarModelVariantIsVariantOf],
            [RelationshipTypeNeo4j.CarModelVariantAchievedSessionResult, RelationshipType.CarModelVariantAchievedSessionResult],
            [RelationshipTypeNeo4j.CarModelVariantAchievedLapTime, RelationshipType.CarModelVariantAchievedLapTime],
            [RelationshipTypeNeo4j.CarModelVariantIsFeaturedInRacingGame, RelationshipType.CarModelVariantIsFeaturedInRacingGame],
            [RelationshipTypeNeo4j.CarModelVariantHasImage, RelationshipType.CarModelVariantHasImage],
            [RelationshipTypeNeo4j.CarModelVariantHasPrimeImage, RelationshipType.CarModelVariantHasPrimeImage],
        ])],
        [NodeTypeLabel.RaceTrack, new Map([
            [RelationshipTypeNeo4j.RaceTrackHasLayout, RelationshipType.RaceTrackHasLayout],
            [RelationshipTypeNeo4j.RaceTrackHostedRacingEvent, RelationshipType.RaceTrackHostedRacingEvent],
            [RelationshipTypeNeo4j.RaceTrackHasImage, RelationshipType.RaceTrackHasImage],
            [RelationshipTypeNeo4j.RaceTrackHasPrimeImage, RelationshipType.RaceTrackHasPrimeImage],
        ])],
        [NodeTypeLabel.TrackLayout, new Map([
            [RelationshipTypeNeo4j.TrackLayoutBelongsToRaceTrack, RelationshipType.TrackLayoutBelongsToRaceTrack],
            [RelationshipTypeNeo4j.TrackLayoutWasUsedByRacingEvent, RelationshipType.TrackLayoutWasUsedByRacingEvent],
            [RelationshipTypeNeo4j.TrackLayoutHasLapTime, RelationshipType.TrackLayoutHasLapTime],
            [RelationshipTypeNeo4j.TrackLayoutIsFeaturedInRacingGame, RelationshipType.TrackLayoutIsFeaturedInRacingGame],
            [RelationshipTypeNeo4j.TrackLayoutHasImage, RelationshipType.TrackLayoutHasImage],
            [RelationshipTypeNeo4j.TrackLayoutHasPrimeImage, RelationshipType.TrackLayoutHasPrimeImage],
        ])],
        [NodeTypeLabel.RacingSeries, new Map([
            [RelationshipTypeNeo4j.RacingSeriesHasRacingEvent, RelationshipType.RacingSeriesHasRacingEvent],
            [RelationshipTypeNeo4j.RacingSeriesHasImage, RelationshipType.RacingSeriesHasImage],
            [RelationshipTypeNeo4j.RacingSeriesHasPrimeImage, RelationshipType.RacingSeriesHasPrimeImage],
        ])],
        [NodeTypeLabel.RacingEvent, new Map([
            [RelationshipTypeNeo4j.RacingEventBelongsToRacingSeries, RelationshipType.RacingEventBelongsToRacingSeries],
            [RelationshipTypeNeo4j.RacingEventIsFollowedByEvent, RelationshipType.RacingEventIsFollowedByEvent],
            [RelationshipTypeNeo4j.RacingEventFollowsEvent, RelationshipType.RacingEventFollowsEvent],
            [RelationshipTypeNeo4j.RacingEventTookPlaceAtRaceTrack, RelationshipType.RacingEventTookPlaceAtRaceTrack],
            [RelationshipTypeNeo4j.RacingEventUsedTheTrackLayout, RelationshipType.RacingEventUsedTheTrackLayout],
            [RelationshipTypeNeo4j.RacingEventHasRacingSession, RelationshipType.RacingEventHasRacingSession],
            [RelationshipTypeNeo4j.RacingEventHasImage, RelationshipType.RacingEventHasImage],
            [RelationshipTypeNeo4j.RacingEventHasPrimeImage, RelationshipType.RacingEventHasPrimeImage],
        ])],
        [NodeTypeLabel.RacingSession, new Map([
            [RelationshipTypeNeo4j.RacingSessionBelongsToRacingEvent, RelationshipType.RacingSessionBelongsToRacingEvent],
            [RelationshipTypeNeo4j.RacingSessionHasSessionResult, RelationshipType.RacingSessionHasSessionResult],
            [RelationshipTypeNeo4j.RacingSessionHasImage, RelationshipType.RacingSessionHasImage],
            [RelationshipTypeNeo4j.RacingSessionHasPrimeImage, RelationshipType.RacingSessionHasPrimeImage],
        ])],
        [NodeTypeLabel.SessionResult, new Map([
            [RelationshipTypeNeo4j.SessionResultBelongsToRacingSession, RelationshipType.SessionResultBelongsToRacingSession],
            [RelationshipTypeNeo4j.SessionResultHasLapTime, RelationshipType.SessionResultHasLapTime],
            [RelationshipTypeNeo4j.SessionResultAchievedWithCarModelVariant, RelationshipType.SessionResultAchievedWithCarModelVariant],
            [RelationshipTypeNeo4j.SessionResultHasImage, RelationshipType.SessionResultHasImage],
            [RelationshipTypeNeo4j.SessionResultHasPrimeImage, RelationshipType.SessionResultHasPrimeImage],
        ])],
        [NodeTypeLabel.LapTime, new Map([
            [RelationshipTypeNeo4j.LapTimeBelongsToSessionResult, RelationshipType.LapTimeBelongsToSessionResult],
            [RelationshipTypeNeo4j.LapTimeAchievedOnTrackLayout, RelationshipType.LapTimeAchievedOnTrackLayout],
            [RelationshipTypeNeo4j.LapTimeAchievedWithCarModelVariant, RelationshipType.LapTimeAchievedWithCarModelVariant],
            [RelationshipTypeNeo4j.LapTimeHasImage, RelationshipType.LapTimeHasImage],
            [RelationshipTypeNeo4j.LapTimeHasPrimeImage, RelationshipType.LapTimeHasPrimeImage],
        ])],
        [NodeTypeLabel.RacingGame, new Map([
            [RelationshipTypeNeo4j.RacingGameFeaturesCarModelVariant, RelationshipType.RacingGameFeaturesCarModelVariant],
            [RelationshipTypeNeo4j.RacingGameFeaturesTrackLayout, RelationshipType.RacingGameFeaturesTrackLayout],
            [RelationshipTypeNeo4j.RacingGameReleasedOnGamingPlatform, RelationshipType.RacingGameReleasedOnGamingPlatform],
            [RelationshipTypeNeo4j.RacingGameHasImage, RelationshipType.RacingGameHasImage],
            [RelationshipTypeNeo4j.RacingGameHasPrimeImage, RelationshipType.RacingGameHasPrimeImage],
        ])],
        [NodeTypeLabel.GamingPlatform, new Map([
            [RelationshipTypeNeo4j.GamingPlatformFeaturesRacingGame, RelationshipType.GamingPlatformFeaturesRacingGame],
            [RelationshipTypeNeo4j.GamingPlatformHasImage, RelationshipType.GamingPlatformHasImage],
            [RelationshipTypeNeo4j.GamingPlatformHasPrimeImage, RelationshipType.GamingPlatformHasPrimeImage],
        ])],
        [NodeTypeLabel.Image, new Map([
            [RelationshipTypeNeo4j.ImageBelongsToNode, RelationshipType.ImageBelongsToNode],
            [RelationshipTypeNeo4j.ImageIsPrimeImageOfNode, RelationshipType.ImageIsPrimeImageOfNode],
        ])],
    ])

    const dbRelationshipType = mapping.get(startNodeLabel)?.get(neo4jRelationshipType)

    if (!dbRelationshipType) {
        throw new RelationshipTypeNotFoundError(neo4jRelationshipType)
    }

    return dbRelationshipType
}
