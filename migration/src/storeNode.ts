import type {Node} from "neo4j-driver"
import {DbNodeType} from "../../src/db/types/DbNodeType"
import {createNeo4jNode} from "../../src/db/nodes/createNeo4jNode"
import {addMoreCarsIdToNode} from "../../src/db/nodes/addMoreCarsIdToNode"
import type {InputCompanyCreate} from "../../src/db/node-types/companies/types/InputCompanyCreate"
import type {InputBrandCreate} from "../../src/db/node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../src/db/node-types/car-models/types/InputCarModelCreate"
import type {InputCarModelVariantCreate} from "../../src/db/node-types/car-model-variants/types/InputCarModelVariantCreate"
import type {InputPriceCreate} from "../../src/db/node-types/prices/types/InputPriceCreate"
import type {InputRaceTrackCreate} from "../../src/db/node-types/race-tracks/types/InputRaceTrackCreate"
import type {InputTrackLayoutCreate} from "../../src/db/node-types/track-layouts/types/InputTrackLayoutCreate"
import type {InputRacingSeriesCreate} from "../../src/db/node-types/racing-series/types/InputRacingSeriesCreate"
import type {InputRacingEventCreate} from "../../src/db/node-types/racing-events/types/InputRacingEventCreate"
import type {InputRacingSessionCreate} from "../../src/db/node-types/racing-sessions/types/InputRacingSessionCreate"
import type {InputSessionResultCreate} from "../../src/db/node-types/session-results/types/InputSessionResultCreate"
import type {InputLapTimeCreate} from "../../src/db/node-types/lap-times/types/InputLapTimeCreate"
import type {InputRacingGameCreate} from "../../src/db/node-types/racing-games/types/InputRacingGameCreate"
import type {InputGamingPlatformCreate} from "../../src/db/node-types/gaming-platforms/types/InputGamingPlatformCreate"
import type {InputModelCarCreate} from "../../src/db/node-types/model-cars/types/InputModelCarCreate"
import type {InputModelCarBrandCreate} from "../../src/db/node-types/model-car-brands/types/InputModelCarBrandCreate"
import type {InputMagazineCreate} from "../../src/db/node-types/magazines/types/InputMagazineCreate"
import type {InputMagazineIssueCreate} from "../../src/db/node-types/magazine-issues/types/InputMagazineIssueCreate"
import type {InputRatingCreate} from "../../src/db/node-types/ratings/types/InputRatingCreate"
import type {InputProgrammeCreate} from "../../src/db/node-types/programmes/types/InputProgrammeCreate"
import type {InputProgrammeEpisodeCreate} from "../../src/db/node-types/programme-episodes/types/InputProgrammeEpisodeCreate"
import type {InputMotorShowCreate} from "../../src/db/node-types/motor-shows/types/InputMotorShowCreate"
import type {InputVideoCreate} from "../../src/db/node-types/videos/types/InputVideoCreate"
import type {InputImageCreate} from "../../src/db/node-types/images/types/InputImageCreate"

type InputTypes =
    InputCompanyCreate |
    InputBrandCreate |
    InputCarModelCreate |
    InputCarModelVariantCreate |
    InputPriceCreate |
    InputRaceTrackCreate |
    InputTrackLayoutCreate |
    InputRacingSeriesCreate |
    InputRacingEventCreate |
    InputRacingSessionCreate |
    InputSessionResultCreate |
    InputLapTimeCreate |
    InputRacingGameCreate |
    InputGamingPlatformCreate |
    InputModelCarCreate |
    InputModelCarBrandCreate |
    InputMagazineCreate |
    InputMagazineIssueCreate |
    InputRatingCreate |
    InputProgrammeCreate |
    InputProgrammeEpisodeCreate |
    InputMotorShowCreate |
    InputVideoCreate |
    InputImageCreate


export async function storeNode(data: InputTypes, newNodeType: DbNodeType, oldNode: Node) {
    try {
        const createdNode = await createNeo4jNode(newNodeType, data)
        await addMoreCarsIdToNode(
            parseInt(oldNode.elementId) + 10_000_000,
            createdNode.elementId,
        )
    } catch (e) {
        console.error(e)
        console.error(oldNode)
    }
}
