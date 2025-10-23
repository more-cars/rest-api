import assert from "assert"
import {NodeTypeEnum} from "../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedCompany} from "./companies/nodes/seedCompany"
import {seedBrand} from "./brands/nodes/seedBrand"
import {seedCarModel} from "./car-models/nodes/seedCarModel"
import {seedRaceTrack} from "./race-tracks/nodes/seedRaceTrack"
import {seedTrackLayout} from "./track-layouts/nodes/seedTrackLayout"
import {seedRacingSeries} from "./racing-series/nodes/seedRacingSeries"
import {seedRacingEvent} from "./racing-events/nodes/seedRacingEvent"
import {seedImage} from "./images/nodes/seedImage"

export async function seedNode(nodeType: NodeTypeEnum, customFakeData: object = {}) {
    switch (nodeType) {
        case NodeTypeEnum.COMPANY:
            return await seedCompany(customFakeData)
        case NodeTypeEnum.BRAND:
            return await seedBrand(customFakeData)
        case NodeTypeEnum.CAR_MODEL:
            return await seedCarModel(customFakeData)
        case NodeTypeEnum.RACE_TRACK:
            return await seedRaceTrack(customFakeData)
        case NodeTypeEnum.TRACK_LAYOUT:
            return await seedTrackLayout(customFakeData)
        case NodeTypeEnum.RACING_SERIES:
            return seedRacingSeries(customFakeData)
        case NodeTypeEnum.RACING_EVENT:
            return seedRacingEvent(customFakeData)
        case NodeTypeEnum.IMAGE:
            return await seedImage(customFakeData)
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
