import {Neo4jNodeType} from "../types/Neo4jNodeType"
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

export function getNodeSpecification(nodeType: Neo4jNodeType) {
    const mapping = new Map<Neo4jNodeType, NodeSpecification>([
        [Neo4jNodeType.Company, CompanyNodeSpecification],
        [Neo4jNodeType.Brand, BrandNodeSpecification],
        [Neo4jNodeType.CarModel, CarModelNodeSpecification],
        [Neo4jNodeType.CarModelVariant, CarModelVariantNodeSpecification],
        [Neo4jNodeType.RaceTrack, RaceTrackNodeSpecification],
        [Neo4jNodeType.TrackLayout, TrackLayoutNodeSpecification],
        [Neo4jNodeType.RacingSeries, RacingSeriesNodeSpecification],
        [Neo4jNodeType.RacingEvent, RacingEventNodeSpecification],
        [Neo4jNodeType.RacingSession, RacingSessionNodeSpecification],
        [Neo4jNodeType.SessionResult, SessionResultNodeSpecification],
        [Neo4jNodeType.LapTime, LapTimeNodeSpecification],
        [Neo4jNodeType.RacingGame, RacingGameNodeSpecification],
        [Neo4jNodeType.GamingPlatform, GamingPlatformNodeSpecification],
        [Neo4jNodeType.Image, ImageNodeSpecification],
    ])

    const spec = mapping.get(nodeType)

    if (!spec) {
        throw new Error(`No mapping for node type ${nodeType} found`)
    }

    return spec
}
