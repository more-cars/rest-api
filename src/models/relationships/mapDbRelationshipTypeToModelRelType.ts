import {RelationshipType} from "../../db/types/RelationshipType"
import {RelType} from "./types/RelType"
import {RelTypeNotFoundError} from "../types/RelTypeNotFoundError"

export function mapDbRelationshipTypeToModelRelType(dbRelationshipType: RelationshipType): RelType {
    const mapping = new Map<RelationshipType, RelType>([
        [RelationshipType.CompanyHasBrand, RelType.CompanyHasBrand],
        [RelationshipType.CompanyHasImage, RelType.CompanyHasImage],
        [RelationshipType.CompanyHasPrimeImage, RelType.CompanyHasPrimeImage],
        [RelationshipType.BrandBelongsToCompany, RelType.BrandBelongsToCompany],
        [RelationshipType.BrandHasCarModel, RelType.BrandHasCarModel],
        [RelationshipType.BrandHasImage, RelType.BrandHasImage],
        [RelationshipType.BrandHasPrimeImage, RelType.BrandHasPrimeImage],
        [RelationshipType.CarModelBelongsToBrand, RelType.CarModelBelongsToBrand],
        [RelationshipType.CarModelHasSuccessor, RelType.CarModelHasSuccessor],
        [RelationshipType.CarModelIsSuccessorOf, RelType.CarModelIsSuccessorOf],
        [RelationshipType.CarModelHasVariant, RelType.CarModelHasVariant],
        [RelationshipType.CarModelHasImage, RelType.CarModelHasImage],
        [RelationshipType.CarModelHasPrimeImage, RelType.CarModelHasPrimeImage],
        [RelationshipType.CarModelVariantIsVariantOf, RelType.CarModelVariantIsVariantOf],
        [RelationshipType.CarModelVariantAchievedSessionResult, RelType.CarModelVariantAchievedSessionResult],
        [RelationshipType.CarModelVariantAchievedLapTime, RelType.CarModelVariantAchievedLapTime],
        [RelationshipType.CarModelVariantIsFeaturedInRacingGame, RelType.CarModelVariantIsFeaturedInRacingGame],
        [RelationshipType.CarModelVariantHasImage, RelType.CarModelVariantHasImage],
        [RelationshipType.CarModelVariantHasPrimeImage, RelType.CarModelVariantHasPrimeImage],
        [RelationshipType.RaceTrackHasLayout, RelType.RaceTrackHasLayout],
        [RelationshipType.RaceTrackHostedRacingEvent, RelType.RaceTrackHostedRacingEvent],
        [RelationshipType.RaceTrackHasImage, RelType.RaceTrackHasImage],
        [RelationshipType.RaceTrackHasPrimeImage, RelType.RaceTrackHasPrimeImage],
        [RelationshipType.TrackLayoutBelongsToRaceTrack, RelType.TrackLayoutBelongsToRaceTrack],
        [RelationshipType.TrackLayoutWasUsedByRacingEvent, RelType.TrackLayoutWasUsedByRacingEvent],
        [RelationshipType.TrackLayoutHasLapTime, RelType.TrackLayoutHasLapTime],
        [RelationshipType.TrackLayoutIsFeaturedInRacingGame, RelType.TrackLayoutIsFeaturedInRacingGame],
        [RelationshipType.TrackLayoutHasImage, RelType.TrackLayoutHasImage],
        [RelationshipType.TrackLayoutHasPrimeImage, RelType.TrackLayoutHasPrimeImage],
        [RelationshipType.RacingSeriesHasRacingEvent, RelType.RacingSeriesHasRacingEvent],
        [RelationshipType.RacingSeriesHasImage, RelType.RacingSeriesHasImage],
        [RelationshipType.RacingSeriesHasPrimeImage, RelType.RacingSeriesHasPrimeImage],
        [RelationshipType.RacingEventBelongsToRacingSeries, RelType.RacingEventBelongsToRacingSeries],
        [RelationshipType.RacingEventIsFollowedByEvent, RelType.RacingEventIsFollowedByEvent],
        [RelationshipType.RacingEventFollowsEvent, RelType.RacingEventFollowsEvent],
        [RelationshipType.RacingEventTookPlaceAtRaceTrack, RelType.RacingEventTookPlaceAtRaceTrack],
        [RelationshipType.RacingEventUsedTheTrackLayout, RelType.RacingEventUsedTheTrackLayout],
        [RelationshipType.RacingEventHasRacingSession, RelType.RacingEventHasRacingSession],
        [RelationshipType.RacingEventHasImage, RelType.RacingEventHasImage],
        [RelationshipType.RacingEventHasPrimeImage, RelType.RacingEventHasPrimeImage],
        [RelationshipType.RacingSessionBelongsToRacingEvent, RelType.RacingSessionBelongsToRacingEvent],
        [RelationshipType.RacingSessionHasSessionResult, RelType.RacingSessionHasSessionResult],
        [RelationshipType.RacingSessionHasImage, RelType.RacingSessionHasImage],
        [RelationshipType.RacingSessionHasPrimeImage, RelType.RacingSessionHasPrimeImage],
        [RelationshipType.SessionResultBelongsToRacingSession, RelType.SessionResultBelongsToRacingSession],
        [RelationshipType.SessionResultHasLapTime, RelType.SessionResultHasLapTime],
        [RelationshipType.SessionResultAchievedWithCarModelVariant, RelType.SessionResultAchievedWithCarModelVariant],
        [RelationshipType.SessionResultHasImage, RelType.SessionResultHasImage],
        [RelationshipType.SessionResultHasPrimeImage, RelType.SessionResultHasPrimeImage],
        [RelationshipType.LapTimeBelongsToSessionResult, RelType.LapTimeBelongsToSessionResult],
        [RelationshipType.LapTimeAchievedOnTrackLayout, RelType.LapTimeAchievedOnTrackLayout],
        [RelationshipType.LapTimeAchievedWithCarModelVariant, RelType.LapTimeAchievedWithCarModelVariant],
        [RelationshipType.LapTimeHasImage, RelType.LapTimeHasImage],
        [RelationshipType.LapTimeHasPrimeImage, RelType.LapTimeHasPrimeImage],
        [RelationshipType.RacingGameFeaturesCarModelVariant, RelType.RacingGameFeaturesCarModelVariant],
        [RelationshipType.RacingGameFeaturesTrackLayout, RelType.RacingGameFeaturesTrackLayout],
        [RelationshipType.RacingGameReleasedOnGamingPlatform, RelType.RacingGameReleasedOnGamingPlatform],
        [RelationshipType.RacingGameHasImage, RelType.RacingGameHasImage],
        [RelationshipType.RacingGameHasPrimeImage, RelType.RacingGameHasPrimeImage],
        [RelationshipType.GamingPlatformFeaturesRacingGame, RelType.GamingPlatformFeaturesRacingGame],
        [RelationshipType.GamingPlatformHasImage, RelType.GamingPlatformHasImage],
        [RelationshipType.GamingPlatformHasPrimeImage, RelType.GamingPlatformHasPrimeImage],
        [RelationshipType.MagazineHasImage, RelType.MagazineHasImage],
        [RelationshipType.ImageBelongsToNode, RelType.ImageBelongsToNode],
        [RelationshipType.ImageIsPrimeImageOfNode, RelType.ImageIsPrimeImageOfNode],
    ])

    const modelRelType = mapping.get(dbRelationshipType)

    if (!modelRelType) {
        throw new RelTypeNotFoundError(dbRelationshipType)
    }

    return modelRelType
}
