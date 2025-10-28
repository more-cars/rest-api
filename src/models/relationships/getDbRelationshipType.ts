import {RelationshipType} from "./types/RelationshipType"
import {DbRelationship} from "../../db/types/DbRelationship"
import {RelationshipTypeNotFoundError} from "../types/RelationshipTypeNotFoundError"

export function getDbRelationshipType(relationshipType: RelationshipType): DbRelationship {
    const mapping = new Map<RelationshipType, DbRelationship>([
        [RelationshipType.CompanyHasBrand, DbRelationship.CompanyHasBrand],
        [RelationshipType.CompanyHasImage, DbRelationship.CompanyHasImage],
        [RelationshipType.CompanyHasPrimeImage, DbRelationship.CompanyHasPrimeImage],
        [RelationshipType.BrandBelongsToCompany, DbRelationship.BrandBelongsToCompany],
        [RelationshipType.BrandHasCarModel, DbRelationship.BrandHasCarModel],
        [RelationshipType.BrandHasImage, DbRelationship.BrandHasImage],
        [RelationshipType.BrandHasPrimeImage, DbRelationship.BrandHasPrimeImage],
        [RelationshipType.CarModelBelongsToBrand, DbRelationship.CarModelBelongsToBrand],
        [RelationshipType.CarModelHasSuccessor, DbRelationship.CarModelHasSuccessor],
        [RelationshipType.CarModelIsSuccessorOf, DbRelationship.CarModelIsSuccessorOf],
        [RelationshipType.CarModelHasImage, DbRelationship.CarModelHasImage],
        [RelationshipType.CarModelHasPrimeImage, DbRelationship.CarModelHasPrimeImage],
        [RelationshipType.RaceTrackHasLayout, DbRelationship.RaceTrackHasLayout],
        [RelationshipType.RaceTrackHostedRacingEvent, DbRelationship.RaceTrackHostedRacingEvent],
        [RelationshipType.RaceTrackHasImage, DbRelationship.RaceTrackHasImage],
        [RelationshipType.RaceTrackHasPrimeImage, DbRelationship.RaceTrackHasPrimeImage],
        [RelationshipType.TrackLayoutBelongsToRaceTrack, DbRelationship.TrackLayoutBelongsToRaceTrack],
        [RelationshipType.TrackLayoutWasUsedByRacingEvent, DbRelationship.TrackLayoutWasUsedByRacingEvent],
        [RelationshipType.TrackLayoutHasLapTime, DbRelationship.TrackLayoutHasLapTime],
        [RelationshipType.TrackLayoutHasImage, DbRelationship.TrackLayoutHasImage],
        [RelationshipType.TrackLayoutHasPrimeImage, DbRelationship.TrackLayoutHasPrimeImage],
        [RelationshipType.RacingSeriesHasRacingEvent, DbRelationship.RacingSeriesHasRacingEvent],
        [RelationshipType.RacingSeriesHasImage, DbRelationship.RacingSeriesHasImage],
        [RelationshipType.RacingSeriesHasPrimeImage, DbRelationship.RacingSeriesHasPrimeImage],
        [RelationshipType.RacingEventBelongsToRacingSeries, DbRelationship.RacingEventBelongsToRacingSeries],
        [RelationshipType.RacingEventIsFollowedByEvent, DbRelationship.RacingEventIsFollowedByEvent],
        [RelationshipType.RacingEventFollowsEvent, DbRelationship.RacingEventFollowsEvent],
        [RelationshipType.RacingEventTookPlaceAtRaceTrack, DbRelationship.RacingEventTookPlaceAtRaceTrack],
        [RelationshipType.RacingEventUsedTheTrackLayout, DbRelationship.RacingEventUsedTheTrackLayout],
        [RelationshipType.RacingEventHasRacingSession, DbRelationship.RacingEventHasRacingSession],
        [RelationshipType.RacingEventHasImage, DbRelationship.RacingEventHasImage],
        [RelationshipType.RacingEventHasPrimeImage, DbRelationship.RacingEventHasPrimeImage],
        [RelationshipType.RacingSessionBelongsToRacingEvent, DbRelationship.RacingSessionBelongsToRacingEvent],
        [RelationshipType.RacingSessionHasSessionResult, DbRelationship.RacingSessionHasSessionResult],
        [RelationshipType.RacingSessionHasImage, DbRelationship.RacingSessionHasImage],
        [RelationshipType.RacingSessionHasPrimeImage, DbRelationship.RacingSessionHasPrimeImage],
        [RelationshipType.SessionResultBelongsToRacingSession, DbRelationship.SessionResultBelongsToRacingSession],
        [RelationshipType.SessionResultHasLapTime, DbRelationship.SessionResultHasLapTime],
        [RelationshipType.SessionResultHasImage, DbRelationship.SessionResultHasImage],
        [RelationshipType.SessionResultHasPrimeImage, DbRelationship.SessionResultHasPrimeImage],
        [RelationshipType.LapTimeBelongsToSessionResult, DbRelationship.LapTimeBelongsToSessionResult],
        [RelationshipType.LapTimeAchievedOnTrackLayout, DbRelationship.LapTimeAchievedOnTrackLayout],
        [RelationshipType.LapTimeHasImage, DbRelationship.LapTimeHasImage],
        [RelationshipType.LapTimeHasPrimeImage, DbRelationship.LapTimeHasPrimeImage],
        [RelationshipType.ImageBelongsToNode, DbRelationship.ImageBelongsToNode],
    ])

    const mappedRel = mapping.get(relationshipType)

    if (!mappedRel) {
        throw new RelationshipTypeNotFoundError(relationshipType)
    }

    return mappedRel
}
