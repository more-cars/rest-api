import {NodeTypeLabel} from "../NodeTypeLabel"
import {NodeSpecification} from "../types/NodeSpecification"
import {CompanyNodeSpecification} from "./companies/types/CompanyNodeSpecification"
import {BrandNodeSpecification} from "./brands/types/BrandNodeSpecification"
import {CarModelNodeSpecification} from "./car-models/types/CarModelNodeSpecification"
import {CarModelVariantNodeSpecification} from "./car-model-variants/types/CarModelVariantNodeSpecification"
import {RaceTrackNodeSpecification} from "./race-tracks/types/RaceTrackNodeSpecification"
import {TrackLayoutNodeSpecification} from "./track-layouts/types/TrackLayoutNodeSpecification"
import {RacingSeriesNodeSpecification} from "./racing-series/types/RacingSeriesNodeSpecification"
import {RacingEventNodeSpecification} from "./racing-events/types/RacingEventNodeSpecification"
import {RacingSessionNodeSpecification} from "./racing-sessions/types/RacingSessionNodeSpecification"
import {SessionResultNodeSpecification} from "./session-results/types/SessionResultNodeSpecification"
import {LapTimeNodeSpecification} from "./lap-times/types/LapTimeNodeSpecification"
import {RacingGameNodeSpecification} from "./racing-games/types/RacingGameNodeSpecification"
import {GamingPlatformNodeSpecification} from "./gaming-platforms/types/GamingPlatformNodeSpecification"
import {ImageNodeSpecification} from "./images/types/ImageNodeSpecification"

export function getNodeSpecification(nodeType: NodeTypeLabel) {
    const mapping = new Map<NodeTypeLabel, NodeSpecification>([
        [NodeTypeLabel.Company, CompanyNodeSpecification],
        [NodeTypeLabel.Brand, BrandNodeSpecification],
        [NodeTypeLabel.CarModel, CarModelNodeSpecification],
        [NodeTypeLabel.CarModelVariant, CarModelVariantNodeSpecification],
        [NodeTypeLabel.RaceTrack, RaceTrackNodeSpecification],
        [NodeTypeLabel.TrackLayout, TrackLayoutNodeSpecification],
        [NodeTypeLabel.RacingSeries, RacingSeriesNodeSpecification],
        [NodeTypeLabel.RacingEvent, RacingEventNodeSpecification],
        [NodeTypeLabel.RacingSession, RacingSessionNodeSpecification],
        [NodeTypeLabel.SessionResult, SessionResultNodeSpecification],
        [NodeTypeLabel.LapTime, LapTimeNodeSpecification],
        [NodeTypeLabel.RacingGame, RacingGameNodeSpecification],
        [NodeTypeLabel.GamingPlatform, GamingPlatformNodeSpecification],
        [NodeTypeLabel.Image, ImageNodeSpecification],
    ])

    const spec = mapping.get(nodeType)

    if (!spec) {
        throw new Error(`No mapping for node type ${nodeType} found`)
    }

    return spec
}
