import type {DbNode} from "../../db/types/DbNode"
import {DbNodeType} from "../../db/types/DbNodeType"
import {convertCompanyDbNodeToModelNode} from "./companies/create/convertCompanyDbNodeToModelNode"
import type {CompanyNode} from "../../db/node-types/companies/types/CompanyNode"
import {convertBrandDbNodeToModelNode} from "./brands/create/convertBrandDbNodeToModelNode"
import type {BrandNode} from "../../db/node-types/brands/types/BrandNode"
import {convertCarModelDbNodeToModelNode} from "./car-models/create/convertCarModelDbNodeToModelNode"
import type {CarModelNode} from "../../db/node-types/car-models/types/CarModelNode"
import {convertCarModelVariantDbNodeToModelNode} from "./car-model-variants/create/convertCarModelVariantDbNodeToModelNode"
import type {CarModelVariantNode} from "../../db/node-types/car-model-variants/types/CarModelVariantNode"
import {convertRaceTrackDbNodeToModelNode} from "./race-tracks/create/convertRaceTrackDbNodeToModelNode"
import type {RaceTrackNode} from "../../db/node-types/race-tracks/types/RaceTrackNode"
import {convertTrackLayoutDbNodeToModelNode} from "./track-layouts/create/convertTrackLayoutDbNodeToModelNode"
import type {TrackLayoutNode} from "../../db/node-types/track-layouts/types/TrackLayoutNode"
import {convertRacingSeriesDbNodeToModelNode} from "./racing-series/create/convertRacingSeriesDbNodeToModelNode"
import type {RacingSeriesNode} from "../../db/node-types/racing-series/types/RacingSeriesNode"
import {convertRacingEventDbNodeToModelNode} from "./racing-events/create/convertRacingEventDbNodeToModelNode"
import type {RacingEventNode} from "../../db/node-types/racing-events/types/RacingEventNode"
import {convertRacingSessionDbNodeToModelNode} from "./racing-sessions/create/convertRacingSessionDbNodeToModelNode"
import type {RacingSessionNode} from "../../db/node-types/racing-sessions/types/RacingSessionNode"
import {convertSessionResultDbNodeToModelNode} from "./session-results/create/convertSessionResultDbNodeToModelNode"
import type {SessionResultNode} from "../../db/node-types/session-results/types/SessionResultNode"
import {convertLapTimeDbNodeToModelNode} from "./lap-times/create/convertLapTimeDbNodeToModelNode"
import type {LapTimeNode} from "../../db/node-types/lap-times/types/LapTimeNode"
import {convertRacingGameDbNodeToModelNode} from "./racing-games/create/convertRacingGameDbNodeToModelNode"
import type {RacingGameNode} from "../../db/node-types/racing-games/types/RacingGameNode"
import {convertGamingPlatformDbNodeToModelNode} from "./gaming-platforms/create/convertGamingPlatformDbNodeToModelNode"
import type {GamingPlatformNode} from "../../db/node-types/gaming-platforms/types/GamingPlatformNode"
import {convertMagazineDbNodeToModelNode} from "./magazines/create/convertMagazineDbNodeToModelNode"
import type {MagazineNode} from "../../db/node-types/magazines/types/MagazineNode"
import {convertImageDbNodeToModelNode} from "./images/create/convertImageDbNodeToModelNode"
import type {ImageNode} from "../../db/node-types/images/types/ImageNode"
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
        case DbNodeType.Magazine:
            return convertMagazineDbNodeToModelNode(dbNode as MagazineNode)
        case DbNodeType.Image:
            return convertImageDbNodeToModelNode(dbNode as ImageNode)
        default:
            throw new NodeTypeNotFoundError(dbNode.node_type)
    }
}
