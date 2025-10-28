import {DbRelationship} from "../../src/db/types/DbRelationship"
import {RelationshipTypeLabelOld} from "./types/RelationshipTypeLabelOld"

// mapping of all relationship types to find out their names in the old database
export const RelationshipTypeMapping = new Map<DbRelationship, RelationshipTypeLabelOld>([
    [DbRelationship.CompanyHasBrand, RelationshipTypeLabelOld.CompanyHasBrand],
    [DbRelationship.BrandHasCarModel, RelationshipTypeLabelOld.BrandHasCarModel],
    [DbRelationship.CarModelHasSuccessor, RelationshipTypeLabelOld.CarModelHasSuccessor],
    [DbRelationship.RaceTrackHasLayout, RelationshipTypeLabelOld.RaceTrackHasLayout],
    [DbRelationship.TrackLayoutHasLapTime, RelationshipTypeLabelOld.TrackLayoutHasLapTime],
    [DbRelationship.RacingSeriesHasRacingEvent, RelationshipTypeLabelOld.RacingSeriesHasRacingEvent],
    [DbRelationship.RacingEventIsFollowedByEvent, RelationshipTypeLabelOld.RacingEventIsFollowedByEvent],
    [DbRelationship.RacingEventTookPlaceAtRaceTrack, RelationshipTypeLabelOld.RacingEventTookPlaceAtRaceTrack],
    [DbRelationship.RacingEventUsedTheTrackLayout, RelationshipTypeLabelOld.RacingEventUsedTheTrackLayout],
    [DbRelationship.RacingEventHasRacingSession, RelationshipTypeLabelOld.RacingEventHasRacingSession],
    [DbRelationship.RacingSessionHasSessionResult, RelationshipTypeLabelOld.RacingSessionHasSessionResult],
    [DbRelationship.SessionResultHasLapTime, RelationshipTypeLabelOld.SessionResultHasLapTime],
    [DbRelationship.NodeHasImage, RelationshipTypeLabelOld.NodeHasImage],
    [DbRelationship.NodeHasPrimeImage, RelationshipTypeLabelOld.NodeHasPrimeImage],
])
