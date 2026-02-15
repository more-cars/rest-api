import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {DbRelationshipName} from "../../../types/DbRelationshipName"

export const TrackLayoutRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.TrackLayoutBelongsToRaceTrack, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.RaceTrack,
        relationshipName: DbRelationshipName.TrackLayoutBelongsToRaceTrack,
        isReverseRelationship: true,
    }],
    [DbRelationship.TrackLayoutWasUsedByRacingEvent, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: DbRelationshipName.TrackLayoutWasUsedByRacingEvent,
        isReverseRelationship: true,
    }],
    [DbRelationship.TrackLayoutHasLapTime, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.LapTime,
        relationshipName: DbRelationshipName.TrackLayoutHasLapTime,
        isReverseRelationship: false,
    }],
    [DbRelationship.TrackLayoutIsFeaturedInRacingGame, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.RacingGame,
        relationshipName: DbRelationshipName.TrackLayoutIsFeaturedInRacingGame,
        isReverseRelationship: true,
    }],
    [DbRelationship.TrackLayoutHasImage, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.TrackLayoutHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.TrackLayoutHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.TrackLayoutHasPrimeImage,
        isReverseRelationship: false,
    }],
]
