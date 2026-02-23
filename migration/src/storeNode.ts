import type {Node} from "neo4j-driver"
import type {InputCompanyCreate} from "../../src/db/node-types/companies/types/InputCompanyCreate"
import type {InputBrandCreate} from "../../src/db/node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../src/db/node-types/car-models/types/InputCarModelCreate"
import type {InputCarModelVariantCreate} from "../../src/db/node-types/car-model-variants/types/InputCarModelVariantCreate"
import type {InputRaceTrackCreate} from "../../src/db/node-types/race-tracks/types/InputRaceTrackCreate"
import type {InputTrackLayoutCreate} from "../../src/db/node-types/track-layouts/types/InputTrackLayoutCreate"
import type {InputRacingSeriesCreate} from "../../src/db/node-types/racing-series/types/InputRacingSeriesCreate"
import type {InputRacingEventCreate} from "../../src/db/node-types/racing-events/types/InputRacingEventCreate"
import type {InputRacingSessionCreate} from "../../src/db/node-types/racing-sessions/types/InputRacingSessionCreate"
import type {InputSessionResultCreate} from "../../src/db/node-types/session-results/types/InputSessionResultCreate"
import type {InputLapTimeCreate} from "../../src/db/node-types/lap-times/types/InputLapTimeCreate"
import type {InputRacingGameCreate} from "../../src/db/node-types/racing-games/types/InputRacingGameCreate"
import type {InputGamingPlatformCreate} from "../../src/db/node-types/gaming-platforms/types/InputGamingPlatformCreate"
import type {InputImageCreate} from "../../src/db/node-types/images/types/InputImageCreate"
import {DbNodeType} from "../../src/db/types/DbNodeType"
import {createDbNode} from "../../src/db/nodes/createDbNode"
import {addMoreCarsIdToNode} from "../../src/db/nodes/addMoreCarsIdToNode"
import {addTimestampsToNode} from "../../src/db/nodes/addTimestampsToNode"

type InputTypes =
    InputCompanyCreate |
    InputBrandCreate |
    InputCarModelCreate |
    InputCarModelVariantCreate |
    InputRaceTrackCreate |
    InputTrackLayoutCreate |
    InputRacingSeriesCreate |
    InputRacingEventCreate |
    InputRacingSessionCreate |
    InputSessionResultCreate |
    InputLapTimeCreate |
    InputRacingGameCreate |
    InputGamingPlatformCreate |
    InputImageCreate


export async function storeNode(data: InputTypes, newNodeType: DbNodeType, oldNode: Node): Promise<void> {
    try {
        const createdNode: Node = await createDbNode(newNodeType, data)
        await addMoreCarsIdToNode(
            createdNode.elementId,
            parseInt(oldNode.elementId) + 10_000_000
        )
        await addTimestampsToNode(
            createdNode.elementId,
            new Date(oldNode.properties.created_at).toISOString(),
            new Date(oldNode.properties.updated_at).toISOString(),
        )
    } catch (e) {
        console.error(e)
        console.error(oldNode)
    }
}
