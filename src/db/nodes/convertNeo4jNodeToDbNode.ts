import type {Node} from "neo4j-driver"
import {Neo4jNodeType} from "../types/Neo4jNodeType"
import {NodeTypeNotFoundError} from "../types/NodeTypeNotFoundError"
import {mapDbNodeToCompanyNode} from "./companies/mapDbNodeToCompanyNode"
import {mapDbNodeToBrandNode} from "./brands/mapDbNodeToBrandNode"
import {mapDbNodeToCarModelNode} from "./car-models/mapDbNodeToCarModelNode"
import {mapDbNodeToCarModelVariantNode} from "./car-model-variants/mapDbNodeToCarModelVariantNode"
import {mapDbNodeToRaceTrackNode} from "./race-tracks/mapDbNodeToRaceTrackNode"
import {mapDbNodeToTrackLayoutNode} from "./track-layouts/mapDbNodeToTrackLayoutNode"
import {mapDbNodeToRacingSeriesNode} from "./racing-series/mapDbNodeToRacingSeriesNode"
import {mapDbNodeToRacingEventNode} from "./racing-events/mapDbNodeToRacingEventNode"
import {mapDbNodeToRacingSessionNode} from "./racing-sessions/mapDbNodeToRacingSessionNode"
import {mapDbNodeToSessionResultNode} from "./session-results/mapDbNodeToSessionResultNode"
import {mapDbNodeToLapTimeNode} from "./lap-times/mapDbNodeToLapTimeNode"
import {mapDbNodeToRacingGameNode} from "./racing-games/mapDbNodeToRacingGameNode"
import {mapDbNodeToGamingPlatformNode} from "./gaming-platforms/mapDbNodeToGamingPlatformNode"
import {mapDbNodeToImageNode} from "./images/mapDbNodeToImageNode"

export function convertNeo4jNodeToDbNode(neo4jNode: Node, nodeTypeLabel: Neo4jNodeType) {
    switch (nodeTypeLabel) {
        case Neo4jNodeType.Image:
            return mapDbNodeToImageNode(neo4jNode)
        case Neo4jNodeType.Company:
            return mapDbNodeToCompanyNode(neo4jNode)
        case Neo4jNodeType.Brand:
            return mapDbNodeToBrandNode(neo4jNode)
        case Neo4jNodeType.CarModel:
            return mapDbNodeToCarModelNode(neo4jNode)
        case Neo4jNodeType.CarModelVariant:
            return mapDbNodeToCarModelVariantNode(neo4jNode)
        case Neo4jNodeType.RaceTrack:
            return mapDbNodeToRaceTrackNode(neo4jNode)
        case Neo4jNodeType.TrackLayout:
            return mapDbNodeToTrackLayoutNode(neo4jNode)
        case Neo4jNodeType.RacingSeries:
            return mapDbNodeToRacingSeriesNode(neo4jNode)
        case Neo4jNodeType.RacingEvent:
            return mapDbNodeToRacingEventNode(neo4jNode)
        case Neo4jNodeType.RacingSession:
            return mapDbNodeToRacingSessionNode(neo4jNode)
        case Neo4jNodeType.SessionResult:
            return mapDbNodeToSessionResultNode(neo4jNode)
        case Neo4jNodeType.LapTime:
            return mapDbNodeToLapTimeNode(neo4jNode)
        case Neo4jNodeType.RacingGame:
            return mapDbNodeToRacingGameNode(neo4jNode)
        case Neo4jNodeType.GamingPlatform:
            return mapDbNodeToGamingPlatformNode(neo4jNode)
        default:
            throw new NodeTypeNotFoundError(nodeTypeLabel)
    }
}
