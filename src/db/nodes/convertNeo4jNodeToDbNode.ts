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
    const mapping = new Map<Neo4jNodeType, (neo4jNode: Node) => void>([
        [Neo4jNodeType.Company, convertCompanyNeo4jNodeToDbNode],
        [Neo4jNodeType.Brand, convertBrandNeo4jNodeToDbNode],
        [Neo4jNodeType.CarModel, convertCarModelNeo4jNodeToDbNode],
        [Neo4jNodeType.CarModelVariant, convertCarModelVariantNeo4jNodeToDbNode],
        [Neo4jNodeType.RaceTrack, convertRaceTrackNeo4jNodeToDbNode],
        [Neo4jNodeType.TrackLayout, convertTrackLayoutNeo4jNodeToDbNode],
        [Neo4jNodeType.RacingSeries, convertRacingSeriesNeo4jNodeToDbNode],
        [Neo4jNodeType.RacingEvent, convertRacingEventNeo4jNodeToDbNode],
        [Neo4jNodeType.RacingSession, convertRacingSessionNeo4jNodeToDbNode],
        [Neo4jNodeType.SessionResult, convertSessionResultNeo4jNodeToDbNode],
        [Neo4jNodeType.LapTime, convertLapTimeNeo4jNodeToDbNode],
        [Neo4jNodeType.RacingGame, convertRacingGameNeo4jNodeToDbNode],
        [Neo4jNodeType.GamingPlatform, convertGamingPlatformNeo4jNodeToDbNode],
        [Neo4jNodeType.Image, convertImageNeo4jNodeToDbNode],
    ])

    const convertFn = mapping.get(nodeTypeLabel)

    if (!convertFn) {
        throw new NodeTypeNotFoundError(nodeTypeLabel)
    }

    return convertFn(neo4jNode)
}
