import type {Node} from "neo4j-driver"
import {Neo4jNodeType} from "../types/Neo4jNodeType"
import {NodeTypeNotFoundError} from "../types/NodeTypeNotFoundError"
import {convertCompanyNeo4jNodeToDbNode} from "../node-types/companies/convertCompanyNeo4jNodeToDbNode"
import {convertBrandNeo4jNodeToDbNode} from "../node-types/brands/convertBrandNeo4jNodeToDbNode"
import {convertCarModelNeo4jNodeToDbNode} from "../node-types/car-models/convertCarModelNeo4jNodeToDbNode"
import {convertCarModelVariantNeo4jNodeToDbNode} from "../node-types/car-model-variants/convertCarModelVariantNeo4jNodeToDbNode"
import {convertRaceTrackNeo4jNodeToDbNode} from "../node-types/race-tracks/convertRaceTrackNeo4jNodeToDbNode"
import {convertTrackLayoutNeo4jNodeToDbNode} from "../node-types/track-layouts/convertTrackLayoutNeo4jNodeToDbNode"
import {convertRacingSeriesNeo4jNodeToDbNode} from "../node-types/racing-series/convertRacingSeriesNeo4jNodeToDbNode"
import {convertRacingEventNeo4jNodeToDbNode} from "../node-types/racing-events/convertRacingEventNeo4jNodeToDbNode"
import {convertRacingSessionNeo4jNodeToDbNode} from "../node-types/racing-sessions/convertRacingSessionNeo4jNodeToDbNode"
import {convertSessionResultNeo4jNodeToDbNode} from "../node-types/session-results/convertSessionResultNeo4jNodeToDbNode"
import {convertLapTimeNeo4jNodeToDbNode} from "../node-types/lap-times/convertLapTimeNeo4jNodeToDbNode"
import {convertRacingGameNeo4jNodeToDbNode} from "../node-types/racing-games/convertRacingGameNeo4jNodeToDbNode"
import {convertGamingPlatformNeo4jNodeToDbNode} from "../node-types/gaming-platforms/convertGamingPlatformNeo4jNodeToDbNode"
import {convertImageNeo4jNodeToDbNode} from "../node-types/images/convertImageNeo4jNodeToDbNode"

export function convertNeo4jNodeToDbNode(neo4jNode: Node, nodeTypeLabel: Neo4jNodeType) {
    switch (nodeTypeLabel) {
        case Neo4jNodeType.Image:
            return convertImageNeo4jNodeToDbNode(neo4jNode)
        case Neo4jNodeType.Company:
            return convertCompanyNeo4jNodeToDbNode(neo4jNode)
        case Neo4jNodeType.Brand:
            return convertBrandNeo4jNodeToDbNode(neo4jNode)
        case Neo4jNodeType.CarModel:
            return convertCarModelNeo4jNodeToDbNode(neo4jNode)
        case Neo4jNodeType.CarModelVariant:
            return convertCarModelVariantNeo4jNodeToDbNode(neo4jNode)
        case Neo4jNodeType.RaceTrack:
            return convertRaceTrackNeo4jNodeToDbNode(neo4jNode)
        case Neo4jNodeType.TrackLayout:
            return convertTrackLayoutNeo4jNodeToDbNode(neo4jNode)
        case Neo4jNodeType.RacingSeries:
            return convertRacingSeriesNeo4jNodeToDbNode(neo4jNode)
        case Neo4jNodeType.RacingEvent:
            return convertRacingEventNeo4jNodeToDbNode(neo4jNode)
        case Neo4jNodeType.RacingSession:
            return convertRacingSessionNeo4jNodeToDbNode(neo4jNode)
        case Neo4jNodeType.SessionResult:
            return convertSessionResultNeo4jNodeToDbNode(neo4jNode)
        case Neo4jNodeType.LapTime:
            return convertLapTimeNeo4jNodeToDbNode(neo4jNode)
        case Neo4jNodeType.RacingGame:
            return convertRacingGameNeo4jNodeToDbNode(neo4jNode)
        case Neo4jNodeType.GamingPlatform:
            return convertGamingPlatformNeo4jNodeToDbNode(neo4jNode)
        default:
            throw new NodeTypeNotFoundError(nodeTypeLabel)
    }
}
