import assert from "assert"
import type {Node} from "neo4j-driver"
import {DbNodeType} from "../../src/db/types/DbNodeType"
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
import {mapMagazine} from "./mappings/mapMagazine"
import {mapMagazineIssue} from "./mappings/mapMagazineIssue"
import {mapRating} from "./mappings/mapRating"
import {mapProgramme} from "./mappings/mapProgramme"
import {mapProgrammeEpisode} from "./mappings/mapProgrammeEpisode"
import {mapMotorShow} from "./mappings/mapMotorShow"
import {mapImage} from "./mappings/mapImage"

export function mapNodeProperties(oldNode: Node, nodeType: DbNodeType) {
    switch (nodeType) {
        case DbNodeType.Company:
            return mapCompany(oldNode)
        case DbNodeType.Brand:
            return mapBrand(oldNode)
        case DbNodeType.CarModel:
            return mapCarModel(oldNode)
        case DbNodeType.CarModelVariant:
            return mapCarModelVariant(oldNode)
        case DbNodeType.RaceTrack:
            return mapRaceTrack(oldNode)
        case DbNodeType.TrackLayout:
            return mapTrackLayout(oldNode)
        case DbNodeType.RacingSeries:
            return mapRacingSeries(oldNode)
        case DbNodeType.RacingEvent:
            return mapRacingEvent(oldNode)
        case DbNodeType.RacingSession:
            return mapRacingSession(oldNode)
        case DbNodeType.SessionResult:
            return mapSessionResult(oldNode)
        case DbNodeType.LapTime:
            return mapLapTime(oldNode)
        case DbNodeType.RacingGame:
            return mapRacingGame(oldNode)
        case DbNodeType.GamingPlatform:
            return mapGamingPlatform(oldNode)
        case DbNodeType.Magazine:
            return mapMagazine(oldNode)
        case DbNodeType.MagazineIssue:
            return mapMagazineIssue(oldNode)
        case DbNodeType.Rating:
            return mapRating(oldNode)
        case DbNodeType.Programme:
            return mapProgramme(oldNode)
        case DbNodeType.ProgrammeEpisode:
            return mapProgrammeEpisode(oldNode)
        case DbNodeType.MotorShow:
            return mapMotorShow(oldNode)
        case DbNodeType.Image:
            return mapImage(oldNode)
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
