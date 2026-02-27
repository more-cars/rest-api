import {RelationshipType as DbRelationshipType} from "../db/types/RelationshipType"
import {RelationshipType} from "./RelationshipType"
import {RelationshipTypeMappingNotFoundError} from "./RelationshipTypeMappingNotFoundError"

export function mapDbRelationshipTypeToRelationshipType(dbRelationshipType: DbRelationshipType): RelationshipType {
    const mapping = new Map<DbRelationshipType, RelationshipType>([
        [DbRelationshipType.CompanyHasBrand, RelationshipType.CompanyHasBrand],
        [DbRelationshipType.CompanyHasImage, RelationshipType.CompanyHasImage],
        [DbRelationshipType.CompanyHasPrimeImage, RelationshipType.CompanyHasPrimeImage],
        [DbRelationshipType.BrandBelongsToCompany, RelationshipType.BrandBelongsToCompany],
        [DbRelationshipType.BrandHasCarModel, RelationshipType.BrandHasCarModel],
        [DbRelationshipType.BrandHasImage, RelationshipType.BrandHasImage],
        [DbRelationshipType.BrandHasPrimeImage, RelationshipType.BrandHasPrimeImage],
        [DbRelationshipType.CarModelBelongsToBrand, RelationshipType.CarModelBelongsToBrand],
        [DbRelationshipType.CarModelHasSuccessor, RelationshipType.CarModelHasSuccessor],
        [DbRelationshipType.CarModelIsSuccessorOf, RelationshipType.CarModelIsSuccessorOf],
        [DbRelationshipType.CarModelHasVariant, RelationshipType.CarModelHasVariant],
        [DbRelationshipType.CarModelHasImage, RelationshipType.CarModelHasImage],
        [DbRelationshipType.CarModelHasPrimeImage, RelationshipType.CarModelHasPrimeImage],
        [DbRelationshipType.CarModelVariantIsVariantOf, RelationshipType.CarModelVariantIsVariantOf],
        [DbRelationshipType.CarModelVariantAchievedSessionResult, RelationshipType.CarModelVariantAchievedSessionResult],
        [DbRelationshipType.CarModelVariantAchievedLapTime, RelationshipType.CarModelVariantAchievedLapTime],
        [DbRelationshipType.CarModelVariantIsFeaturedInRacingGame, RelationshipType.CarModelVariantIsFeaturedInRacingGame],
        [DbRelationshipType.CarModelVariantHasImage, RelationshipType.CarModelVariantHasImage],
        [DbRelationshipType.CarModelVariantHasPrimeImage, RelationshipType.CarModelVariantHasPrimeImage],
        [DbRelationshipType.RaceTrackHasLayout, RelationshipType.RaceTrackHasLayout],
        [DbRelationshipType.RaceTrackHostedRacingEvent, RelationshipType.RaceTrackHostedRacingEvent],
        [DbRelationshipType.RaceTrackHasImage, RelationshipType.RaceTrackHasImage],
        [DbRelationshipType.RaceTrackHasPrimeImage, RelationshipType.RaceTrackHasPrimeImage],
        [DbRelationshipType.TrackLayoutBelongsToRaceTrack, RelationshipType.TrackLayoutBelongsToRaceTrack],
        [DbRelationshipType.TrackLayoutWasUsedByRacingEvent, RelationshipType.TrackLayoutWasUsedByRacingEvent],
        [DbRelationshipType.TrackLayoutHasLapTime, RelationshipType.TrackLayoutHasLapTime],
        [DbRelationshipType.TrackLayoutIsFeaturedInRacingGame, RelationshipType.TrackLayoutIsFeaturedInRacingGame],
        [DbRelationshipType.TrackLayoutHasImage, RelationshipType.TrackLayoutHasImage],
        [DbRelationshipType.TrackLayoutHasPrimeImage, RelationshipType.TrackLayoutHasPrimeImage],
        [DbRelationshipType.RacingSeriesHasRacingEvent, RelationshipType.RacingSeriesHasRacingEvent],
        [DbRelationshipType.RacingSeriesHasImage, RelationshipType.RacingSeriesHasImage],
        [DbRelationshipType.RacingSeriesHasPrimeImage, RelationshipType.RacingSeriesHasPrimeImage],
        [DbRelationshipType.RacingEventBelongsToRacingSeries, RelationshipType.RacingEventBelongsToRacingSeries],
        [DbRelationshipType.RacingEventIsFollowedByEvent, RelationshipType.RacingEventIsFollowedByEvent],
        [DbRelationshipType.RacingEventFollowsEvent, RelationshipType.RacingEventFollowsEvent],
        [DbRelationshipType.RacingEventTookPlaceAtRaceTrack, RelationshipType.RacingEventTookPlaceAtRaceTrack],
        [DbRelationshipType.RacingEventUsedTheTrackLayout, RelationshipType.RacingEventUsedTheTrackLayout],
        [DbRelationshipType.RacingEventHasRacingSession, RelationshipType.RacingEventHasRacingSession],
        [DbRelationshipType.RacingEventHasImage, RelationshipType.RacingEventHasImage],
        [DbRelationshipType.RacingEventHasPrimeImage, RelationshipType.RacingEventHasPrimeImage],
        [DbRelationshipType.RacingSessionBelongsToRacingEvent, RelationshipType.RacingSessionBelongsToRacingEvent],
        [DbRelationshipType.RacingSessionHasSessionResult, RelationshipType.RacingSessionHasSessionResult],
        [DbRelationshipType.RacingSessionHasImage, RelationshipType.RacingSessionHasImage],
        [DbRelationshipType.RacingSessionHasPrimeImage, RelationshipType.RacingSessionHasPrimeImage],
        [DbRelationshipType.SessionResultBelongsToRacingSession, RelationshipType.SessionResultBelongsToRacingSession],
        [DbRelationshipType.SessionResultHasLapTime, RelationshipType.SessionResultHasLapTime],
        [DbRelationshipType.SessionResultAchievedWithCarModelVariant, RelationshipType.SessionResultAchievedWithCarModelVariant],
        [DbRelationshipType.SessionResultHasImage, RelationshipType.SessionResultHasImage],
        [DbRelationshipType.SessionResultHasPrimeImage, RelationshipType.SessionResultHasPrimeImage],
        [DbRelationshipType.LapTimeBelongsToSessionResult, RelationshipType.LapTimeBelongsToSessionResult],
        [DbRelationshipType.LapTimeAchievedOnTrackLayout, RelationshipType.LapTimeAchievedOnTrackLayout],
        [DbRelationshipType.LapTimeAchievedWithCarModelVariant, RelationshipType.LapTimeAchievedWithCarModelVariant],
        [DbRelationshipType.LapTimeHasImage, RelationshipType.LapTimeHasImage],
        [DbRelationshipType.LapTimeHasPrimeImage, RelationshipType.LapTimeHasPrimeImage],
        [DbRelationshipType.RacingGameFeaturesCarModelVariant, RelationshipType.RacingGameFeaturesCarModelVariant],
        [DbRelationshipType.RacingGameFeaturesTrackLayout, RelationshipType.RacingGameFeaturesTrackLayout],
        [DbRelationshipType.RacingGameReleasedOnGamingPlatform, RelationshipType.RacingGameReleasedOnGamingPlatform],
        [DbRelationshipType.RacingGameHasImage, RelationshipType.RacingGameHasImage],
        [DbRelationshipType.RacingGameHasPrimeImage, RelationshipType.RacingGameHasPrimeImage],
        [DbRelationshipType.GamingPlatformFeaturesRacingGame, RelationshipType.GamingPlatformFeaturesRacingGame],
        [DbRelationshipType.GamingPlatformHasImage, RelationshipType.GamingPlatformHasImage],
        [DbRelationshipType.GamingPlatformHasPrimeImage, RelationshipType.GamingPlatformHasPrimeImage],
        [DbRelationshipType.MagazineHasImage, RelationshipType.MagazineHasImage],
        [DbRelationshipType.ImageBelongsToNode, RelationshipType.ImageBelongsToNode],
        [DbRelationshipType.ImageIsPrimeImageOfNode, RelationshipType.ImageIsPrimeImageOfNode],
        [DbRelationshipType.MagazineHasPrimeImage, RelationshipType.MagazineHasPrimeImage],
        [DbRelationshipType.NodeHasImage, RelationshipType.NodeHasImage],
        [DbRelationshipType.NodeHasPrimeImage, RelationshipType.NodeHasPrimeImage],
    ])

    const relationshipType = mapping.get(dbRelationshipType)

    if (!relationshipType) {
        throw new RelationshipTypeMappingNotFoundError(dbRelationshipType)
    }

    return relationshipType
}
