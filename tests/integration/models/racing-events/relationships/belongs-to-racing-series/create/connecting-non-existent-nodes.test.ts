import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-racing-series‹ relationship with nodes that do not exist', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)

    await expect(RacingEvent.createBelongsToRacingSeriesRelationship(-42, racingSeries.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createBelongsToRacingSeriesRelationship(racingEvent.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createBelongsToRacingSeriesRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
