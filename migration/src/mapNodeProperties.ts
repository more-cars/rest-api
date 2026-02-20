import assert from "assert"
import type {Node} from "neo4j-driver"
import {Neo4jNodeType} from "../../src/db/types/Neo4jNodeType"
import {mapCompany} from "./mappings/mapCompany"
import {mapBrand} from "./mappings/mapBrand"
import {mapCarModel} from "./mappings/mapCarModel"
import {mapCarModelVariant} from "./mappings/mapCarModelVariant"
import {mapRaceTrack} from "./mappings/mapRaceTrack"
import {mapTrackLayout} from "./mappings/mapTrackLayout"
import {mapRacingSeries} from "./mappings/mapRacingSeries"
import {mapRacingEvent} from "./mappings/mapRacingEvent"
import {mapRacingSession} from "./mappings/mapRacingSession"
import {mapSessionResult} from "./mappings/mapSessionResult"
import {mapLapTime} from "./mappings/mapLapTime"
import {mapRacingGame} from "./mappings/mapRacingGame"
import {mapGamingPlatform} from "./mappings/mapGamingPlatform"
import {mapImage} from "./mappings/mapImage"

export function mapNodeProperties(oldNode: Node, nodeType: Neo4jNodeType) {
    switch (nodeType) {
        case Neo4jNodeType.Company:
            return mapCompany(oldNode)
        case Neo4jNodeType.Brand:
            return mapBrand(oldNode)
        case Neo4jNodeType.CarModel:
            return mapCarModel(oldNode)
        case Neo4jNodeType.CarModelVariant:
            return mapCarModelVariant(oldNode)
        case Neo4jNodeType.RaceTrack:
            return mapRaceTrack(oldNode)
        case Neo4jNodeType.TrackLayout:
            return mapTrackLayout(oldNode)
        case Neo4jNodeType.RacingSeries:
            return mapRacingSeries(oldNode)
        case Neo4jNodeType.RacingEvent:
            return mapRacingEvent(oldNode)
        case Neo4jNodeType.RacingSession:
            return mapRacingSession(oldNode)
        case Neo4jNodeType.SessionResult:
            return mapSessionResult(oldNode)
        case Neo4jNodeType.LapTime:
            return mapLapTime(oldNode)
        case Neo4jNodeType.RacingGame:
            return mapRacingGame(oldNode)
        case Neo4jNodeType.GamingPlatform:
            return mapGamingPlatform(oldNode)
        case Neo4jNodeType.Image:
            return mapImage(oldNode)
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
