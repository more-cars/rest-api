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
        [RelationshipType.ImageBelongsToNode, DbRelationship.ImageBelongsToNode],
    ])

    const mappedRel = mapping.get(relationshipType)

    if (!mappedRel) {
        throw new RelationshipTypeNotFoundError(relationshipType)
    }

    return mappedRel
}
