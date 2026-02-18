import {RelationshipType} from "../../src/db/types/RelationshipType"
import {RelationshipTypeLabelOld} from "./types/RelationshipTypeLabelOld"

// mapping of all relationship types to find out their names in the old database
export const RelationshipTypeMapping = new Map<RelationshipType, RelationshipTypeLabelOld>([
    [RelationshipType.CompanyHasBrand, RelationshipTypeLabelOld.CompanyHasBrand],
    [RelationshipType.BrandHasCarModel, RelationshipTypeLabelOld.BrandHasCarModel],
    [RelationshipType.CarModelHasSuccessor, RelationshipTypeLabelOld.CarModelHasSuccessor],
    [RelationshipType.CarModelHasVariant, RelationshipTypeLabelOld.CarModelHasVariant],
    [RelationshipType.CarModelVariantAchievedSessionResult, RelationshipTypeLabelOld.CarModelVariantAchievedSessionResult],
    [RelationshipType.CarModelVariantAchievedLapTime, RelationshipTypeLabelOld.CarModelVariantAchievedLapTime],
    [RelationshipType.RaceTrackHasLayout, RelationshipTypeLabelOld.RaceTrackHasLayout],
    [RelationshipType.TrackLayoutHasLapTime, RelationshipTypeLabelOld.TrackLayoutHasLapTime],
    [RelationshipType.RacingSeriesHasRacingEvent, RelationshipTypeLabelOld.RacingSeriesHasRacingEvent],
    [RelationshipType.RacingEventIsFollowedByEvent, RelationshipTypeLabelOld.RacingEventIsFollowedByEvent],
    [RelationshipType.RacingEventTookPlaceAtRaceTrack, RelationshipTypeLabelOld.RacingEventTookPlaceAtRaceTrack],
    [RelationshipType.RacingEventUsedTheTrackLayout, RelationshipTypeLabelOld.RacingEventUsedTheTrackLayout],
    [RelationshipType.RacingEventHasRacingSession, RelationshipTypeLabelOld.RacingEventHasRacingSession],
    [RelationshipType.RacingSessionHasSessionResult, RelationshipTypeLabelOld.RacingSessionHasSessionResult],
    [RelationshipType.SessionResultHasLapTime, RelationshipTypeLabelOld.SessionResultHasLapTime],
    [RelationshipType.RacingGameFeaturesCarModelVariant, RelationshipTypeLabelOld.RacingGameFeaturesCarModelVariant],
    [RelationshipType.RacingGameFeaturesTrackLayout, RelationshipTypeLabelOld.RacingGameFeaturesTrackLayout],
    [RelationshipType.GamingPlatformFeaturesRacingGame, RelationshipTypeLabelOld.GamingPlatformFeaturesRacingGame],
    [RelationshipType.NodeHasImage, RelationshipTypeLabelOld.NodeHasImage],
    [RelationshipType.NodeHasPrimeImage, RelationshipTypeLabelOld.NodeHasPrimeImage],
])
