import assert from "assert"
import type {Node} from "neo4j-driver"
import {NodeTypeLabel} from "../../src/db/NodeTypeLabel"
import {mapCompany} from "./mappings/mapCompany"
import {mapBrand} from "./mappings/mapBrand"
import {mapCarModel} from "./mappings/mapCarModel"
import {mapRaceTrack} from "./mappings/mapRaceTrack"
import {mapTrackLayout} from "./mappings/mapTrackLayout"
import {mapRacingSeries} from "./mappings/mapRacingSeries"
import {mapRacingEvent} from "./mappings/mapRacingEvent"
import {mapRacingSession} from "./mappings/mapRacingSession"
import {mapSessionResult} from "./mappings/mapSessionResult"
import {mapLapTime} from "./mappings/mapLapTime"
import {mapImage} from "./mappings/mapImage"

export function mapNodeProperties(oldNode: Node, nodeType: NodeTypeLabel) {
    switch (nodeType) {
        case NodeTypeLabel.Company:
            return mapCompany(oldNode)
        case NodeTypeLabel.Brand:
            return mapBrand(oldNode)
        case NodeTypeLabel.CarModel:
            return mapCarModel(oldNode)
        case NodeTypeLabel.RaceTrack:
            return mapRaceTrack(oldNode)
        case NodeTypeLabel.TrackLayout:
            return mapTrackLayout(oldNode)
        case NodeTypeLabel.RacingSeries:
            return mapRacingSeries(oldNode)
        case NodeTypeLabel.RacingEvent:
            return mapRacingEvent(oldNode)
        case NodeTypeLabel.RacingSession:
            return mapRacingSession(oldNode)
        case NodeTypeLabel.SessionResult:
            return mapSessionResult(oldNode)
        case NodeTypeLabel.LapTime:
            return mapLapTime(oldNode)
        case NodeTypeLabel.Image:
            return mapImage(oldNode)
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
