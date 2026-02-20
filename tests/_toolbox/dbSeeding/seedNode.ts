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
        case ControllerNodeType.COMPANY:
            return seedCompany(customFakeData)
        case ControllerNodeType.BRAND:
            return seedBrand(customFakeData)
        case ControllerNodeType.CAR_MODEL:
            return seedCarModel(customFakeData)
        case ControllerNodeType.CAR_MODEL_VARIANT:
            return seedCarModelVariant(customFakeData)
        case ControllerNodeType.RACE_TRACK:
            return seedRaceTrack(customFakeData)
        case ControllerNodeType.TRACK_LAYOUT:
            return seedTrackLayout(customFakeData)
        case ControllerNodeType.RACING_SERIES:
            return seedRacingSeries(customFakeData)
        case ControllerNodeType.RACING_EVENT:
            return seedRacingEvent(customFakeData)
        case ControllerNodeType.RACING_SESSION:
            return seedRacingSession(customFakeData)
        case ControllerNodeType.SESSION_RESULT:
            return seedSessionResult(customFakeData)
        case ControllerNodeType.LAP_TIME:
            return seedLapTime(customFakeData)
        case ControllerNodeType.RACING_GAME:
            return seedRacingGame(customFakeData)
        case ControllerNodeType.GAMING_PLATFORM:
            return seedGamingPlatform(customFakeData)
        case ControllerNodeType.IMAGE:
            return seedImage(customFakeData)
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
