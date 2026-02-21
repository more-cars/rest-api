import assert from "assert"
import {ControllerNodeType} from "../../../src/controllers/nodes/types/ControllerNodeType"
import {seedCompany} from "./companies/nodes/seedCompany"
import {seedBrand} from "./brands/nodes/seedBrand"
import {seedCarModel} from "./car-models/nodes/seedCarModel"
import {seedCarModelVariant} from "./car-model-variants/nodes/seedCarModelVariant"
import {seedRaceTrack} from "./race-tracks/nodes/seedRaceTrack"
import {seedTrackLayout} from "./track-layouts/nodes/seedTrackLayout"
import {seedRacingSeries} from "./racing-series/nodes/seedRacingSeries"
import {seedRacingEvent} from "./racing-events/nodes/seedRacingEvent"
import {seedRacingSession} from "./racing-sessions/nodes/seedRacingSession"
import {seedSessionResult} from "./session-results/nodes/seedSessionResult"
import {seedLapTime} from "./lap-times/nodes/seedLapTime"
import {seedRacingGame} from "./racing-games/nodes/seedRacingGame"
import {seedGamingPlatform} from "./gaming-platforms/nodes/seedGamingPlatform"
import {seedImage} from "./images/nodes/seedImage"

export async function seedNode(nodeType: ControllerNodeType, customFakeData: object = {}) {
    switch (nodeType) {
        case ControllerNodeType.Company:
            return seedCompany(customFakeData)
        case ControllerNodeType.Brand:
            return seedBrand(customFakeData)
        case ControllerNodeType.CarModel:
            return seedCarModel(customFakeData)
        case ControllerNodeType.CarModelVariant:
            return seedCarModelVariant(customFakeData)
        case ControllerNodeType.RaceTrack:
            return seedRaceTrack(customFakeData)
        case ControllerNodeType.TrackLayout:
            return seedTrackLayout(customFakeData)
        case ControllerNodeType.RacingSeries:
            return seedRacingSeries(customFakeData)
        case ControllerNodeType.RacingEvent:
            return seedRacingEvent(customFakeData)
        case ControllerNodeType.RacingSession:
            return seedRacingSession(customFakeData)
        case ControllerNodeType.SessionResult:
            return seedSessionResult(customFakeData)
        case ControllerNodeType.LapTime:
            return seedLapTime(customFakeData)
        case ControllerNodeType.RacingGame:
            return seedRacingGame(customFakeData)
        case ControllerNodeType.GamingPlatform:
            return seedGamingPlatform(customFakeData)
        case ControllerNodeType.Image:
            return seedImage(customFakeData)
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
