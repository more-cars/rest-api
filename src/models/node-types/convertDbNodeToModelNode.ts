import type {DbNode} from "../../db/types/DbNode"
import {DbNodeType} from "../../db/types/DbNodeType"
import {convertCompanyDbNodeToModelNode} from "./companies/create/convertCompanyDbNodeToModelNode"
import type {CompanyNode} from "../../db/nodes/companies/types/CompanyNode"
import {convertBrandDbNodeToModelNode} from "./brands/create/convertBrandDbNodeToModelNode"
import type {BrandNode} from "../../db/nodes/brands/types/BrandNode"
import {convertCarModelDbNodeToModelNode} from "./car-models/create/convertCarModelDbNodeToModelNode"
import type {CarModelNode} from "../../db/nodes/car-models/types/CarModelNode"
import {convertCarModelVariantDbNodeToModelNode} from "./car-model-variants/create/convertCarModelVariantDbNodeToModelNode"
import type {CarModelVariantNode} from "../../db/nodes/car-model-variants/types/CarModelVariantNode"
import {convertRaceTrackDbNodeToModelNode} from "./race-tracks/create/convertRaceTrackDbNodeToModelNode"
import type {RaceTrackNode} from "../../db/nodes/race-tracks/types/RaceTrackNode"
import {convertTrackLayoutDbNodeToModelNode} from "./track-layouts/create/convertTrackLayoutDbNodeToModelNode"
import type {TrackLayoutNode} from "../../db/nodes/track-layouts/types/TrackLayoutNode"
import {convertRacingSeriesDbNodeToModelNode} from "./racing-series/create/convertRacingSeriesDbNodeToModelNode"
import type {RacingSeriesNode} from "../../db/nodes/racing-series/types/RacingSeriesNode"
import {convertRacingEventDbNodeToModelNode} from "./racing-events/create/convertRacingEventDbNodeToModelNode"
import type {RacingEventNode} from "../../db/nodes/racing-events/types/RacingEventNode"
import {convertRacingSessionDbNodeToModelNode} from "./racing-sessions/create/convertRacingSessionDbNodeToModelNode"
import type {RacingSessionNode} from "../../db/nodes/racing-sessions/types/RacingSessionNode"
import {convertSessionResultDbNodeToModelNode} from "./session-results/create/convertSessionResultDbNodeToModelNode"
import type {SessionResultNode} from "../../db/nodes/session-results/types/SessionResultNode"
import {convertLapTimeDbNodeToModelNode} from "./lap-times/create/convertLapTimeDbNodeToModelNode"
import type {LapTimeNode} from "../../db/nodes/lap-times/types/LapTimeNode"
import {convertRacingGameDbNodeToModelNode} from "./racing-games/create/convertRacingGameDbNodeToModelNode"
import type {RacingGameNode} from "../../db/nodes/racing-games/types/RacingGameNode"
import {convertGamingPlatformDbNodeToModelNode} from "./gaming-platforms/create/convertGamingPlatformDbNodeToModelNode"
import type {GamingPlatformNode} from "../../db/nodes/gaming-platforms/types/GamingPlatformNode"
import {convertImageDbNodeToModelNode} from "./images/create/convertImageDbNodeToModelNode"
import type {ImageNode} from "../../db/nodes/images/types/ImageNode"
import {NodeTypeNotFoundError} from "../types/NodeTypeNotFoundError"

export function convertDbNodeToModelNode(dbNode: DbNode) {
    switch (dbNode.node_type) {
        case DbNodeType.Company:
            return convertCompanyDbNodeToModelNode(dbNode as CompanyNode)
        case DbNodeType.Brand:
            return convertBrandDbNodeToModelNode(dbNode as BrandNode)
        case DbNodeType.CarModel:
            return convertCarModelDbNodeToModelNode(dbNode as CarModelNode)
        case DbNodeType.CarModelVariant:
            return convertCarModelVariantDbNodeToModelNode(dbNode as CarModelVariantNode)
        case DbNodeType.RaceTrack:
            return convertRaceTrackDbNodeToModelNode(dbNode as RaceTrackNode)
        case DbNodeType.TrackLayout:
            return convertTrackLayoutDbNodeToModelNode(dbNode as TrackLayoutNode)
        case DbNodeType.RacingSeries:
            return convertRacingSeriesDbNodeToModelNode(dbNode as RacingSeriesNode)
        case DbNodeType.RacingEvent:
            return convertRacingEventDbNodeToModelNode(dbNode as RacingEventNode)
        case DbNodeType.RacingSession:
            return convertRacingSessionDbNodeToModelNode(dbNode as RacingSessionNode)
        case DbNodeType.SessionResult:
            return convertSessionResultDbNodeToModelNode(dbNode as SessionResultNode)
        case DbNodeType.LapTime:
            return convertLapTimeDbNodeToModelNode(dbNode as LapTimeNode)
        case DbNodeType.RacingGame:
            return convertRacingGameDbNodeToModelNode(dbNode as RacingGameNode)
        case DbNodeType.GamingPlatform:
            return convertGamingPlatformDbNodeToModelNode(dbNode as GamingPlatformNode)
        case DbNodeType.Image:
            return convertImageDbNodeToModelNode(dbNode as ImageNode)
        default:
            throw new NodeTypeNotFoundError(dbNode.node_type)
    }
}
