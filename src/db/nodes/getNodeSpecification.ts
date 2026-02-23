import {DbNodeType} from "../types/DbNodeType"
import {NodeSpecification} from "../types/NodeSpecification"
import {CompanyNodeSpecification} from "../node-types/companies/types/CompanyNodeSpecification"
import {BrandNodeSpecification} from "../node-types/brands/types/BrandNodeSpecification"
import {CarModelNodeSpecification} from "../node-types/car-models/types/CarModelNodeSpecification"
import {CarModelVariantNodeSpecification} from "../node-types/car-model-variants/types/CarModelVariantNodeSpecification"
import {RaceTrackNodeSpecification} from "../node-types/race-tracks/types/RaceTrackNodeSpecification"
import {TrackLayoutNodeSpecification} from "../node-types/track-layouts/types/TrackLayoutNodeSpecification"
import {RacingSeriesNodeSpecification} from "../node-types/racing-series/types/RacingSeriesNodeSpecification"
import {RacingEventNodeSpecification} from "../node-types/racing-events/types/RacingEventNodeSpecification"
import {RacingSessionNodeSpecification} from "../node-types/racing-sessions/types/RacingSessionNodeSpecification"
import {SessionResultNodeSpecification} from "../node-types/session-results/types/SessionResultNodeSpecification"
import {LapTimeNodeSpecification} from "../node-types/lap-times/types/LapTimeNodeSpecification"
import {RacingGameNodeSpecification} from "../node-types/racing-games/types/RacingGameNodeSpecification"
import {GamingPlatformNodeSpecification} from "../node-types/gaming-platforms/types/GamingPlatformNodeSpecification"
import {ImageNodeSpecification} from "../node-types/images/types/ImageNodeSpecification"

export function getNodeSpecification(nodeType: DbNodeType) {
    const mapping = new Map<DbNodeType, NodeSpecification>([
        [DbNodeType.Company, CompanyNodeSpecification],
        [DbNodeType.Brand, BrandNodeSpecification],
        [DbNodeType.CarModel, CarModelNodeSpecification],
        [DbNodeType.CarModelVariant, CarModelVariantNodeSpecification],
        [DbNodeType.RaceTrack, RaceTrackNodeSpecification],
        [DbNodeType.TrackLayout, TrackLayoutNodeSpecification],
        [DbNodeType.RacingSeries, RacingSeriesNodeSpecification],
        [DbNodeType.RacingEvent, RacingEventNodeSpecification],
        [DbNodeType.RacingSession, RacingSessionNodeSpecification],
        [DbNodeType.SessionResult, SessionResultNodeSpecification],
        [DbNodeType.LapTime, LapTimeNodeSpecification],
        [DbNodeType.RacingGame, RacingGameNodeSpecification],
        [DbNodeType.GamingPlatform, GamingPlatformNodeSpecification],
        [DbNodeType.Image, ImageNodeSpecification],
    ])

    const spec = mapping.get(nodeType)

    if (!spec) {
        throw new Error(`No mapping for node type ${nodeType} found`)
    }

    return spec
}
