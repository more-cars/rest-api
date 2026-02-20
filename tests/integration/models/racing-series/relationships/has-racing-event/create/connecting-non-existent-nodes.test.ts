import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-racing-event‹ relationship with nodes that do not exist', async () => {
    const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

    await expect(RacingSeries.createHasRacingEventRelationship(-42, racingEvent.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSeries.createHasRacingEventRelationship(racingSeries.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSeries.createHasRacingEventRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
