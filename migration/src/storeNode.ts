import type {Node} from "neo4j-driver"
import type {InputCompanyCreate} from "../../src/db/nodes/companies/types/InputCompanyCreate"
import type {InputBrandCreate} from "../../src/db/nodes/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../src/db/nodes/car-models/types/InputCarModelCreate"
import type {InputCarModelVariantCreate} from "../../src/db/nodes/car-model-variants/types/InputCarModelVariantCreate"
import type {InputRaceTrackCreate} from "../../src/db/nodes/race-tracks/types/InputRaceTrackCreate"
import type {InputTrackLayoutCreate} from "../../src/db/nodes/track-layouts/types/InputTrackLayoutCreate"
import type {InputRacingSeriesCreate} from "../../src/db/nodes/racing-series/types/InputRacingSeriesCreate"
import type {InputRacingEventCreate} from "../../src/db/nodes/racing-events/types/InputRacingEventCreate"
import type {InputRacingSessionCreate} from "../../src/db/nodes/racing-sessions/types/InputRacingSessionCreate"
import type {InputSessionResultCreate} from "../../src/db/nodes/session-results/types/InputSessionResultCreate"
import type {InputLapTimeCreate} from "../../src/db/nodes/lap-times/types/InputLapTimeCreate"
import type {InputRacingGameCreate} from "../../src/db/nodes/racing-games/types/InputRacingGameCreate"
import type {InputGamingPlatformCreate} from "../../src/db/nodes/gaming-platforms/types/InputGamingPlatformCreate"
import type {InputImageCreate} from "../../src/db/nodes/images/types/InputImageCreate"
import {NodeTypeLabel} from "../../src/db/NodeTypeLabel"
import {createDbNode, createNodeQuery} from "../../src/db/nodes/createDbNode"
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


export async function storeNode(data: InputTypes, newNodeType: NodeTypeLabel, oldNode: Node): Promise<void> {
    let query = createNodeQuery(newNodeType, data)

    try {
        const createdNode: Node = await createDbNode(newNodeType, query)
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
