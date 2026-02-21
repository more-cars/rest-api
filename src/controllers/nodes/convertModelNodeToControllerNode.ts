import type {ModelNode} from "../../models/types/ModelNode"
import {ModelNodeType} from "../../models/types/ModelNodeType"
import {NodeTypeNotFoundError} from "./types/NodeTypeNotFoundError"
import {convertCompanyModelNodeToControllerNode} from "../node-types/companies/convertCompanyModelNodeToControllerNode"
import {convertBrandModelNodeToControllerNode} from "../node-types/brands/convertBrandModelNodeToControllerNode"
import {convertCarModelModelNodeToControllerNode} from "../node-types/car-models/convertCarModelModelNodeToControllerNode"
import {convertCarModelVariantModelNodeToControllerNode} from "../node-types/car-model-variants/convertCarModelVariantModelNodeToControllerNode"
import {convertRaceTrackModelNodeToControllerNode} from "../node-types/race-tracks/convertRaceTrackModelNodeToControllerNode"
import {convertTrackLayoutModelNodeToControllerNode} from "../node-types/track-layouts/convertTrackLayoutModelNodeToControllerNode"
import {convertRacingSeriesModelNodeToControllerNode} from "../node-types/racing-series/convertRacingSeriesModelNodeToControllerNode"
import {convertRacingEventModelNodeToControllerNode} from "../node-types/racing-events/convertRacingEventModelNodeToControllerNode"
import {convertRacingSessionModelNodeToControllerNode} from "../node-types/racing-sessions/convertRacingSessionModelNodeToControllerNode"
import {convertSessionResultModelNodeToControllerNode} from "../node-types/session-results/convertSessionResultModelNodeToControllerNode"
import {convertLapTimeModelNodeToControllerNode} from "../node-types/lap-times/convertLapTimeModelNodeToControllerNode"
import {convertRacingGameModelNodeToControllerNode} from "../node-types/racing-games/convertRacingGameModelNodeToControllerNode"
import {convertGamingPlatformNodeToControllerNode} from "../node-types/gaming-platforms/convertGamingPlatformNodeToControllerNode"
import {convertImageModelNodeToControllerNode} from "../node-types/images/convertImageModelNodeToControllerNode"
import type {CompanyNode} from "../../models/node-types/companies/types/CompanyNode"
import type {BrandNode} from "../../models/node-types/brands/types/BrandNode"
import type {CarModelNode} from "../../models/node-types/car-models/types/CarModelNode"
import type {CarModelVariantNode} from "../../models/node-types/car-model-variants/types/CarModelVariantNode"
import type {RaceTrackNode} from "../../models/node-types/race-tracks/types/RaceTrackNode"
import type {TrackLayoutNode} from "../../models/node-types/track-layouts/types/TrackLayoutNode"
import type {RacingSeriesNode} from "../../models/node-types/racing-series/types/RacingSeriesNode"
import type {RacingEventNode} from "../../models/node-types/racing-events/types/RacingEventNode"
import type {RacingSessionNode} from "../../models/node-types/racing-sessions/types/RacingSessionNode"
import type {SessionResultNode} from "../../models/node-types/session-results/types/SessionResultNode"
import type {LapTimeNode} from "../../models/node-types/lap-times/types/LapTimeNode"
import type {RacingGameNode} from "../../models/node-types/racing-games/types/RacingGameNode"
import type {GamingPlatformNode} from "../../models/node-types/gaming-platforms/types/GamingPlatformNode"
import type {ImageNode} from "../../models/node-types/images/types/ImageNode"

export function convertModelNodeToControllerNode(modelNode: ModelNode) {
    switch (modelNode.node_type) {
        case ModelNodeType.Company:
            return convertCompanyModelNodeToControllerNode(modelNode as CompanyNode)
        case ModelNodeType.Brand:
            return convertBrandModelNodeToControllerNode(modelNode as BrandNode)
        case ModelNodeType.CarModel:
            return convertCarModelModelNodeToControllerNode(modelNode as CarModelNode)
        case ModelNodeType.CarModelVariant:
            return convertCarModelVariantModelNodeToControllerNode(modelNode as CarModelVariantNode)
        case ModelNodeType.RaceTrack:
            return convertRaceTrackModelNodeToControllerNode(modelNode as RaceTrackNode)
        case ModelNodeType.TrackLayout:
            return convertTrackLayoutModelNodeToControllerNode(modelNode as TrackLayoutNode)
        case ModelNodeType.RacingSeries:
            return convertRacingSeriesModelNodeToControllerNode(modelNode as RacingSeriesNode)
        case ModelNodeType.RacingEvent:
            return convertRacingEventModelNodeToControllerNode(modelNode as RacingEventNode)
        case ModelNodeType.RacingSession:
            return convertRacingSessionModelNodeToControllerNode(modelNode as RacingSessionNode)
        case ModelNodeType.SessionResult:
            return convertSessionResultModelNodeToControllerNode(modelNode as SessionResultNode)
        case ModelNodeType.LapTime:
            return convertLapTimeModelNodeToControllerNode(modelNode as LapTimeNode)
        case ModelNodeType.RacingGame:
            return convertRacingGameModelNodeToControllerNode(modelNode as RacingGameNode)
        case ModelNodeType.GamingPlatform:
            return convertGamingPlatformNodeToControllerNode(modelNode as GamingPlatformNode)
        case ModelNodeType.Image:
            return convertImageModelNodeToControllerNode(modelNode as ImageNode)
        default:
            throw new NodeTypeNotFoundError(modelNode.node_type)
    }
}
