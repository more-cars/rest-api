import assert from "assert"
import {DbNodeType} from "../../../src/db/types/DbNodeType"
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
import {seedMagazine} from "./magazines/nodes/seedMagazine"
import {seedImage} from "./images/nodes/seedImage"

export async function seedNode(dbNodeType: DbNodeType, customFakeData: object = {}) {
    switch (dbNodeType) {
        case DbNodeType.Company:
            return seedCompany(customFakeData)
        case DbNodeType.Brand:
            return seedBrand(customFakeData)
        case DbNodeType.CarModel:
            return seedCarModel(customFakeData)
        case DbNodeType.CarModelVariant:
            return seedCarModelVariant(customFakeData)
        case DbNodeType.RaceTrack:
            return seedRaceTrack(customFakeData)
        case DbNodeType.TrackLayout:
            return seedTrackLayout(customFakeData)
        case DbNodeType.RacingSeries:
            return seedRacingSeries(customFakeData)
        case DbNodeType.RacingEvent:
            return seedRacingEvent(customFakeData)
        case DbNodeType.RacingSession:
            return seedRacingSession(customFakeData)
        case DbNodeType.SessionResult:
            return seedSessionResult(customFakeData)
        case DbNodeType.LapTime:
            return seedLapTime(customFakeData)
        case DbNodeType.RacingGame:
            return seedRacingGame(customFakeData)
        case DbNodeType.GamingPlatform:
            return seedGamingPlatform(customFakeData)
        case DbNodeType.Magazine:
            return seedMagazine(customFakeData)
        case DbNodeType.Image:
            return seedImage(customFakeData)
        default:
            assert.fail(`Node type "${dbNodeType}" is invalid or unknown`)
    }
}
