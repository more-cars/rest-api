import {NodeType} from "./NodeType"
import {NodeSpecification} from "./NodeSpecification"
import {CompanyNodeSpecification} from "./node-types/CompanyNodeSpecification"
import {BrandNodeSpecification} from "./node-types/BrandNodeSpecification"
import {CarModelNodeSpecification} from "./node-types/CarModelNodeSpecification"
import {CarModelVariantNodeSpecification} from "./node-types/CarModelVariantNodeSpecification"
import {RaceTrackNodeSpecification} from "./node-types/RaceTrackNodeSpecification"
import {TrackLayoutNodeSpecification} from "./node-types/TrackLayoutNodeSpecification"
import {RacingSeriesNodeSpecification} from "./node-types/RacingSeriesNodeSpecification"
import {RacingEventNodeSpecification} from "./node-types/RacingEventNodeSpecification"
import {RacingSessionNodeSpecification} from "./node-types/RacingSessionNodeSpecification"
import {SessionResultNodeSpecification} from "./node-types/SessionResultNodeSpecification"
import {LapTimeNodeSpecification} from "./node-types/LapTimeNodeSpecification"
import {RacingGameNodeSpecification} from "./node-types/RacingGameNodeSpecification"
import {GamingPlatformNodeSpecification} from "./node-types/GamingPlatformNodeSpecification"
import {ImageNodeSpecification} from "./node-types/ImageNodeSpecification"

export function getNodeTypeSpecification(nodeType: NodeType) {
    const mapping = new Map<NodeType, NodeSpecification>([
        [NodeType.Company, CompanyNodeSpecification],
        [NodeType.Brand, BrandNodeSpecification],
        [NodeType.CarModel, CarModelNodeSpecification],
        [NodeType.CarModelVariant, CarModelVariantNodeSpecification],
        [NodeType.RaceTrack, RaceTrackNodeSpecification],
        [NodeType.TrackLayout, TrackLayoutNodeSpecification],
        [NodeType.RacingSeries, RacingSeriesNodeSpecification],
        [NodeType.RacingEvent, RacingEventNodeSpecification],
        [NodeType.RacingSession, RacingSessionNodeSpecification],
        [NodeType.SessionResult, SessionResultNodeSpecification],
        [NodeType.LapTime, LapTimeNodeSpecification],
        [NodeType.RacingGame, RacingGameNodeSpecification],
        [NodeType.GamingPlatform, GamingPlatformNodeSpecification],
        [NodeType.Image, ImageNodeSpecification],
    ])

    const spec = mapping.get(nodeType)

    if (!spec) {
        throw new Error(`No mapping for node type ${nodeType} found`)
    }

    return spec
}
