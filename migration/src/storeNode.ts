import type {Node} from "neo4j-driver"
import type {InputCompanyCreate} from "../../src/db/nodes/companies/types/InputCompanyCreate"
import type {InputBrandCreate} from "../../src/db/nodes/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../src/db/nodes/car-models/types/InputCarModelCreate"
import type {InputRaceTrackCreate} from "../../src/db/nodes/race-tracks/types/InputRaceTrackCreate"
import type {InputTrackLayoutCreate} from "../../src/db/nodes/track-layouts/types/InputTrackLayoutCreate"
import type {InputRacingSeriesCreate} from "../../src/db/nodes/racing-series/types/InputRacingSeriesCreate"
import type {InputRacingEventCreate} from "../../src/db/nodes/racing-events/types/InputRacingEventCreate"
import type {InputRacingSessionCreate} from "../../src/db/nodes/racing-sessions/types/InputRacingSessionCreate"
import type {InputSessionResultCreate} from "../../src/db/nodes/session-results/types/InputSessionResultCreate"
import type {InputLapTimeCreate} from "../../src/db/nodes/lap-times/types/InputLapTimeCreate"
import type {InputImageCreate} from "../../src/db/nodes/images/types/InputImageCreate"
import {NodeTypeLabel} from "../../src/db/NodeTypeLabel"
import {createNodeQuery as createCompanyQuery} from "../../src/db/nodes/companies/createNode"
import {createNodeQuery as createBrandQuery} from "../../src/db/nodes/brands/createNode"
import {createNodeQuery as createCarModelQuery} from "../../src/db/nodes/car-models/createNode"
import {createNodeQuery as createRaceTrackQuery} from "../../src/db/nodes/race-tracks/createNode"
import {createNodeQuery as createTrackLayoutQuery} from "../../src/db/nodes/track-layouts/createNode"
import {createNodeQuery as createRacingSeriesQuery} from "../../src/db/nodes/racing-series/createNode"
import {createNodeQuery as createRacingEventQuery} from "../../src/db/nodes/racing-events/createNode"
import {createNodeQuery as createRacingSessionQuery} from "../../src/db/nodes/racing-sessions/createNode"
import {createNodeQuery as createSessionResultQuery} from "../../src/db/nodes/session-results/createNode"
import {createNodeQuery as createLapTimeQuery} from "../../src/db/nodes/lap-times/createNode"
import {createNodeQuery as createImageQuery} from "../../src/db/nodes/images/createNode"
import {createDbNode} from "../../src/db/nodes/createDbNode"
import {addMoreCarsIdToNode} from "../../src/db/nodes/addMoreCarsIdToNode"
import {addTimestampsToNode} from "../../src/db/nodes/addTimestampsToNode"

type InputTypes =
    InputCompanyCreate |
    InputBrandCreate |
    InputCarModelCreate |
    InputRaceTrackCreate |
    InputTrackLayoutCreate |
    InputRacingSeriesCreate |
    InputRacingEventCreate |
    InputRacingSessionCreate |
    InputSessionResultCreate |
    InputLapTimeCreate |
    InputImageCreate


export async function storeNode(data: InputTypes, newNodeType: NodeTypeLabel, oldNode: Node): Promise<void> {
    let query = ''

    switch (newNodeType) {
        case NodeTypeLabel.Company:
            query = createCompanyQuery(data as InputCompanyCreate)
            break
        case NodeTypeLabel.Brand:
            query = createBrandQuery(data as InputBrandCreate)
            break
        case NodeTypeLabel.CarModel:
            query = createCarModelQuery(data as InputCarModelCreate)
            break
        case NodeTypeLabel.RaceTrack:
            query = createRaceTrackQuery(data as InputRaceTrackCreate)
            break
        case NodeTypeLabel.TrackLayout:
            query = createTrackLayoutQuery(data as InputTrackLayoutCreate)
            break
        case NodeTypeLabel.RacingSeries:
            query = createRacingSeriesQuery(data as InputRacingSeriesCreate)
            break
        case NodeTypeLabel.RacingEvent:
            query = createRacingEventQuery(data as InputRacingEventCreate)
            break
        case NodeTypeLabel.RacingSession:
            query = createRacingSessionQuery(data as InputRacingSessionCreate)
            break
        case NodeTypeLabel.SessionResult:
            query = createSessionResultQuery(data as InputSessionResultCreate)
            break
        case NodeTypeLabel.LapTime:
            query = createLapTimeQuery(data as InputLapTimeCreate)
            break
        case NodeTypeLabel.Image:
            query = createImageQuery(data as InputImageCreate)
            break
    }

    try {
        const createdNode: Node = await createDbNode(newNodeType, query)
        await addMoreCarsIdToNode(createdNode.elementId, parseInt(oldNode.elementId) + 10_000_000, newNodeType)
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
