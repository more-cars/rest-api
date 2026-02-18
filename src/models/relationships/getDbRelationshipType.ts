import {RelType} from "./types/RelType"
import {DbRelationship} from "../../db/types/DbRelationship"
import {RelationshipTypeNotFoundError} from "../types/RelationshipTypeNotFoundError"

export function getDbRelationshipType(relationshipType: RelType): DbRelationship {
    const mapping = new Map<RelType, DbRelationship>([
        [RelType.CompanyHasBrand, DbRelationship.CompanyHasBrand],
        [RelType.CompanyHasImage, DbRelationship.CompanyHasImage],
        [RelType.CompanyHasPrimeImage, DbRelationship.CompanyHasPrimeImage],
        [RelType.BrandBelongsToCompany, DbRelationship.BrandBelongsToCompany],
        [RelType.BrandHasCarModel, DbRelationship.BrandHasCarModel],
        [RelType.BrandHasImage, DbRelationship.BrandHasImage],
        [RelType.BrandHasPrimeImage, DbRelationship.BrandHasPrimeImage],
        [RelType.CarModelBelongsToBrand, DbRelationship.CarModelBelongsToBrand],
        [RelType.CarModelHasSuccessor, DbRelationship.CarModelHasSuccessor],
        [RelType.CarModelIsSuccessorOf, DbRelationship.CarModelIsSuccessorOf],
        [RelType.CarModelHasVariant, DbRelationship.CarModelHasVariant],
        [RelType.CarModelHasImage, DbRelationship.CarModelHasImage],
        [RelType.CarModelHasPrimeImage, DbRelationship.CarModelHasPrimeImage],
        [RelType.CarModelVariantIsVariantOf, DbRelationship.CarModelVariantIsVariantOf],
        [RelType.CarModelVariantAchievedSessionResult, DbRelationship.CarModelVariantAchievedSessionResult],
        [RelType.CarModelVariantAchievedLapTime, DbRelationship.CarModelVariantAchievedLapTime],
        [RelType.CarModelVariantIsFeaturedInRacingGame, DbRelationship.CarModelVariantIsFeaturedInRacingGame],
        [RelType.CarModelVariantHasImage, DbRelationship.CarModelVariantHasImage],
        [RelType.CarModelVariantHasPrimeImage, DbRelationship.CarModelVariantHasPrimeImage],
        [RelType.RaceTrackHasLayout, DbRelationship.RaceTrackHasLayout],
        [RelType.RaceTrackHostedRacingEvent, DbRelationship.RaceTrackHostedRacingEvent],
        [RelType.RaceTrackHasImage, DbRelationship.RaceTrackHasImage],
        [RelType.RaceTrackHasPrimeImage, DbRelationship.RaceTrackHasPrimeImage],
        [RelType.TrackLayoutBelongsToRaceTrack, DbRelationship.TrackLayoutBelongsToRaceTrack],
        [RelType.TrackLayoutWasUsedByRacingEvent, DbRelationship.TrackLayoutWasUsedByRacingEvent],
        [RelType.TrackLayoutHasLapTime, DbRelationship.TrackLayoutHasLapTime],
        [RelType.TrackLayoutIsFeaturedInRacingGame, DbRelationship.TrackLayoutIsFeaturedInRacingGame],
        [RelType.TrackLayoutHasImage, DbRelationship.TrackLayoutHasImage],
        [RelType.TrackLayoutHasPrimeImage, DbRelationship.TrackLayoutHasPrimeImage],
        [RelType.RacingSeriesHasRacingEvent, DbRelationship.RacingSeriesHasRacingEvent],
        [RelType.RacingSeriesHasImage, DbRelationship.RacingSeriesHasImage],
        [RelType.RacingSeriesHasPrimeImage, DbRelationship.RacingSeriesHasPrimeImage],
        [RelType.RacingEventBelongsToRacingSeries, DbRelationship.RacingEventBelongsToRacingSeries],
        [RelType.RacingEventIsFollowedByEvent, DbRelationship.RacingEventIsFollowedByEvent],
        [RelType.RacingEventFollowsEvent, DbRelationship.RacingEventFollowsEvent],
        [RelType.RacingEventTookPlaceAtRaceTrack, DbRelationship.RacingEventTookPlaceAtRaceTrack],
        [RelType.RacingEventUsedTheTrackLayout, DbRelationship.RacingEventUsedTheTrackLayout],
        [RelType.RacingEventHasRacingSession, DbRelationship.RacingEventHasRacingSession],
        [RelType.RacingEventHasImage, DbRelationship.RacingEventHasImage],
        [RelType.RacingEventHasPrimeImage, DbRelationship.RacingEventHasPrimeImage],
        [RelType.RacingSessionBelongsToRacingEvent, DbRelationship.RacingSessionBelongsToRacingEvent],
        [RelType.RacingSessionHasSessionResult, DbRelationship.RacingSessionHasSessionResult],
        [RelType.RacingSessionHasImage, DbRelationship.RacingSessionHasImage],
        [RelType.RacingSessionHasPrimeImage, DbRelationship.RacingSessionHasPrimeImage],
        [RelType.SessionResultBelongsToRacingSession, DbRelationship.SessionResultBelongsToRacingSession],
        [RelType.SessionResultHasLapTime, DbRelationship.SessionResultHasLapTime],
        [RelType.SessionResultAchievedWithCarModelVariant, DbRelationship.SessionResultAchievedWithCarModelVariant],
        [RelType.SessionResultHasImage, DbRelationship.SessionResultHasImage],
        [RelType.SessionResultHasPrimeImage, DbRelationship.SessionResultHasPrimeImage],
        [RelType.LapTimeBelongsToSessionResult, DbRelationship.LapTimeBelongsToSessionResult],
        [RelType.LapTimeAchievedOnTrackLayout, DbRelationship.LapTimeAchievedOnTrackLayout],
        [RelType.LapTimeAchievedWithCarModelVariant, DbRelationship.LapTimeAchievedWithCarModelVariant],
        [RelType.LapTimeHasImage, DbRelationship.LapTimeHasImage],
        [RelType.LapTimeHasPrimeImage, DbRelationship.LapTimeHasPrimeImage],
        [RelType.RacingGameFeaturesCarModelVariant, DbRelationship.RacingGameFeaturesCarModelVariant],
        [RelType.RacingGameFeaturesTrackLayout, DbRelationship.RacingGameFeaturesTrackLayout],
        [RelType.RacingGameReleasedOnGamingPlatform, DbRelationship.RacingGameReleasedOnGamingPlatform],
        [RelType.RacingGameHasImage, DbRelationship.RacingGameHasImage],
        [RelType.RacingGameHasPrimeImage, DbRelationship.RacingGameHasPrimeImage],
        [RelType.GamingPlatformFeaturesRacingGame, DbRelationship.GamingPlatformFeaturesRacingGame],
        [RelType.GamingPlatformHasImage, DbRelationship.GamingPlatformHasImage],
        [RelType.GamingPlatformHasPrimeImage, DbRelationship.GamingPlatformHasPrimeImage],
        [RelType.ImageBelongsToNode, DbRelationship.ImageBelongsToNode],
        [RelType.ImageIsPrimeImageOfNode, DbRelationship.ImageIsPrimeImageOfNode],
    ])

    const mappedRel = mapping.get(relationshipType)

    if (!mappedRel) {
        throw new RelationshipTypeNotFoundError(relationshipType)
    }

    return mappedRel
}
