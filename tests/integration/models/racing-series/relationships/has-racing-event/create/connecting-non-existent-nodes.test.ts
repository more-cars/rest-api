import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSeries} from "../../../../../../../src/models/racing-series/RacingSeries"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-racing-event‹ relationship with nodes that do not exist', async () => {
    const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

    await expect(RacingSeries.createHasRacingEventRelationship(-42, racingEvent.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSeries.createHasRacingEventRelationship(racingSeries.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSeries.createHasRacingEventRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
